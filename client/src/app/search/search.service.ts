import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { SearchFormFieldValue } from '@shared/components/search-control/custom-search-control/types';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';
import { IUser } from '@user/types/user.interface';
import { SearchScopeEnum, SearchState } from './types';
import { UserService } from '@user/services/user.service';
import { SEARCH_OPTIONS, PAGINATION } from './config';
import { PostService } from '../posts/services/post.service';
import { IPost } from '../posts/types/post';


@Injectable({ providedIn: 'root' })
export class SearchService {
  public readonly searchOptions = SEARCH_OPTIONS;
  public readonly pagination = PAGINATION;

  private _searchState: SearchState = {
    users: [],
    posts: [],
    defaultSearchedPosts: [],
    pagination: this.pagination,
    searchQuery: {
      query: '',
      scope: this.searchOptions[0].value,
    },
  };
  private unsubscribeSubject: UnsubscribeSubject = new UnsubscribeSubject();
  private store = new BehaviorSubject<SearchState>(this._searchState);
  private state$ = this.store.asObservable();

  public isSearching = new BehaviorSubject<boolean>(false);
  public isSearching$ = this.isSearching.asObservable();
  public searchQuery$ = this.state$.pipe(map(state => state.searchQuery), distinctUntilChanged());
  public pagination$ = this.state$.pipe(map(state => state.pagination), distinctUntilChanged());
  public users$ = this.state$.pipe(map(state => state.users), distinctUntilChanged());
  public posts$ = this.state$.pipe(map(state => state.posts), distinctUntilChanged());
  public defaultSearchedPosts$ = this.state$.pipe(map(state => state.defaultSearchedPosts), distinctUntilChanged());

  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  initSearch() {
    this.unsubscribeSubject = new UnsubscribeSubject();

    combineLatest([this.searchQuery$, this.pagination$]).pipe(
      switchMap(([ searchQuery, pagination ]) => {
        if (searchQuery.query && searchQuery.scope === SearchScopeEnum.UserName) {
          return this.userService.findUsers({
            searchField: searchQuery.scope,
            searchValue: searchQuery.query,
            skip: pagination.skip,
            limit: pagination.limit
          });
        } else if (searchQuery.query && searchQuery.scope === SearchScopeEnum.Posts) {
          return this.postService.findPosts({
            searchField: searchQuery.scope,
            searchValue: searchQuery.query,
            skip: pagination.skip,
            limit: pagination.limit
          });
        }

        return EMPTY
      }),
      takeUntil(this.unsubscribeSubject)
    ).subscribe((response: IUser[] | IPost[]) => {
      if (this._searchState.searchQuery.scope === SearchScopeEnum.UserName) {
        this.store.next(this._searchState = { ...this._searchState, users: response as IUser[]});
      } else if (this._searchState.searchQuery.scope === SearchScopeEnum.Posts) {
        this.store.next(this._searchState = { ...this._searchState, posts: response as IPost[]});
      }
    });
  }

  defaultPostsSearch() {
    this.postService.findPosts({
      skip: this.pagination.skip,
      limit: this.pagination.limit
    })
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((posts: IPost[]) => {
        this.store.next(this._searchState = {
          ...this._searchState,
          defaultSearchedPosts: posts as IPost[]
        });
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
