import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
import { Subject,  } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { FormFieldValue } from './types';
import { ErrorStateMatcher } from '@angular/material/core';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';

export class CustomErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control.dirty && control.invalid;
  }
}

@Component({
  selector: 'app-custom-search-control',
  templateUrl: './custom-search-control.component.html',
  styleUrls: ['./custom-search-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomSearchControlComponent
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorMatcher,
    },
  ]
})
export class CustomSearchControlComponent
  implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue>, ControlValueAccessor
{
  static nextId = 0;
  stateChanges = new Subject<void>();
  private unsubscribeSubject = new UnsubscribeSubject();

  @ViewChild(MatInput, { read: ElementRef, static: true })
  input: ElementRef;

  @HostBinding()
  id: string = `custom-form-field-id-${CustomSearchControlComponent.nextId++}`;

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return this.focused && !this.empty;
  }
  @HostBinding('attr.aria-describedby')
  describedBy = '';

  @Input()
  set value(value: FormFieldValue) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }
  get value(): FormFieldValue {
    return this.form.value;
  }

  _placeholder: string;
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder(): string {
    return this._placeholder;
  }

  get empty(): boolean {
    return !this.value.scope && !this.value.query;
  }

  get errorState(): boolean {
    return this.errorStateMatcher.isErrorState(
      this.ngControl.control,
      null
    );
  }

  @Input()
  required: boolean;
  @Input()
  disabled: boolean;

  focused: boolean;
  controlType = 'custom-form-field';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private focusMonitor: FocusMonitor,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    this.form = this.fb.group({
      scope: new FormControl(''),
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.input).subscribe(focused => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
    this.focusMonitor
      .monitor(this.input)
      .pipe(take(1))
      .subscribe(() => {
        this.onTouch();
      });
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((value) => this.onChange(value));
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
    this.unsubscribeSubject.destroy();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }
  onChange: (value: FormFieldValue) => void;
  onTouch: () => void;
}
