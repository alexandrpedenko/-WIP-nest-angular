import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { advancedSearchValidator } from '@shared/utils';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private unsubscribeSubject = new UnsubscribeSubject();
  formControl = new FormControl(
    { scope: 'users', query: '' },
    advancedSearchValidator
  );

  constructor() {}

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(800),
      takeUntil(this.unsubscribeSubject),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.destroy();
  }
}
