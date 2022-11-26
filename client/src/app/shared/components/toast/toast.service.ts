import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { ToastData } from './toast.type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly snackBar: MatSnackBar) {}

  public toast({ toastType, title, message }: ToastData) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        title,
        message,
        toastType,
      },
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [toastType]
    });
  }
}
