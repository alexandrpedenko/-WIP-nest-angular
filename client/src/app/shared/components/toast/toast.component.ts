import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ToastData, ToastType } from './toast.type';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  title!: string;
  message!: string;
  toastType!: ToastType;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private readonly data: ToastData,
    private readonly snackBar: MatSnackBar
  ) {
    this.title = this.data.title;
    this.message = this.data.message;
    this.toastType = this.data.toastType;
  }

  close() {
    this.snackBar.dismiss();
  }
}
