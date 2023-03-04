import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged,  } from 'rxjs/operators';

import { advancedSearchValidator } from '@shared/utils';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';
import { SearchService } from './search.service';
import { SearchFormFieldValue } from '../shared/components/search-control/custom-search-control/types';
import { SEARCH_OPTIONS } from './config';
import { IPost } from '../posts/types/post';
import { SearchScopeEnum } from './types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  public readonly searchOptions = SEARCH_OPTIONS;
  public readonly searchScope = SearchScopeEnum;
  public posts$: Observable<IPost[]>;
  public resetSearch = new Subject<void>();
  public formControl = new FormControl(
    { scope: this.searchOptions[0].value, query: '' },
    advancedSearchValidator
  );
  private unsubscribeSubject = new UnsubscribeSubject();

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      takeUntil(this.unsubscribeSubject),
    ).subscribe((searchQuery: SearchFormFieldValue) => this.searchService.updateSearchQuery(searchQuery));
    this.searchService.defaultPostsSearch();
  }

  ngOnDestroy(): void {
    this.searchService.destroy();
    this.unsubscribeSubject.destroy();
  }

  onSearchInputFocus() {
    if (this.searchService.isSearching.value) {
      return;
    } else {
      this.searchService.isSearching.next(true);
      this.searchService.initSearch();
    }
  }

  onSearchCancel() {
    this.searchService.isSearching.next(false);
    this.resetSearch.next();
    this.searchService.destroy();
  }
}
