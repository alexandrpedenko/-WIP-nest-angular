import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { SearchFormFieldValue } from '@shared/components/search-control/custom-search-control/types';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';
import { IUser } from '@user/types/user.interface';
import { SearchState } from './types';
import { UserService } from '@user/services/user.service';


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

  constructor(private userService: UserService) {}

  initSearch() {
    this.unsubscribeSubject = new UnsubscribeSubject();

    combineLatest([this.searchQuery$, this.pagination$]).pipe(
      switchMap(([ searchQuery, pagination ]) => {
        return this.userService.findUsers({
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
