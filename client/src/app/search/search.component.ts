import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil, distinctUntilChanged, tap } from 'rxjs/operators';
import { advancedSearchValidator } from '@shared/utils';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';
import { SearchService } from './search.service';
import { SearchFormFieldValue } from '../shared/components/search-control/custom-search-control/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private unsubscribeSubject = new UnsubscribeSubject();
  formControl = new FormControl(
    { scope: 'userName', query: '' },
    advancedSearchValidator
  );

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.initSearch();

    this.formControl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      takeUntil(this.unsubscribeSubject),
    ).subscribe((searchQuery: SearchFormFieldValue) => this.searchService.updateSearchQuery(searchQuery));
  }

  ngOnDestroy(): void {
    this.searchService.destroy();
    this.unsubscribeSubject.destroy();
  }
}
