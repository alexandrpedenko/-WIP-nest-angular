import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, EMPTY } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';

import { SearchFormFieldValue } from '@shared/components/search-control/custom-search-control/types';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';
import { UserApiService } from '@user/services/user-api.service';
import { IUser } from '@user/types/user.interface';
import { SearchState } from './types';


@Injectable({ providedIn: 'root' })
export class SearchService {
  private _searchState: SearchState = {
    users: [],
    pagination: {
      limit: 2,
      skip: 0
    },
    searchQuery: {
      query: '',
      scope: 'userName',
    }
  };
  private unsubscribeSubject: UnsubscribeSubject;
  private store = new BehaviorSubject<SearchState>(this._searchState);
  private state$ = this.store.asObservable();

  public isSearching = new BehaviorSubject<boolean>(false);
  public searchQuery$ = this.state$.pipe(map(state => state.searchQuery), distinctUntilChanged());
  public pagination$ = this.state$.pipe(map(state => state.pagination), distinctUntilChanged());
  public users$ = this.state$.pipe(map(state => state.users), distinctUntilChanged());

  constructor(
    private userApiService: UserApiService,
  ) {}

  initSearch() {
    this.unsubscribeSubject = new UnsubscribeSubject();

    combineLatest([this.searchQuery$, this.pagination$]).pipe(
      switchMap(([ searchQuery, pagination ]) => {
        return this.userApiService.findUsers({
          searchField: searchQuery.scope,
          searchValue: searchQuery.query,
          skip: pagination.skip,
          limit: pagination.limit
        });
      }),
      takeUntil(this.unsubscribeSubject)
    ).subscribe((users: IUser[]) => {
      this.store.next(this._searchState = { ...this._searchState, users});
    });
  }

  destroy() {
    this.unsubscribeSubject.destroy();
  }

  updateSearchQuery(searchQuery: SearchFormFieldValue) {
    this.store.next(this._searchState = { ...this._searchState, searchQuery });
  }

  updatePagination(limit: number, skip: number) {
    const pagination = { ...this._searchState.pagination, limit, skip };
    this.store.next(this._searchState = { ...this._searchState, pagination });
  }
}
