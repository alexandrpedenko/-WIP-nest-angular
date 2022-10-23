import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '@shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly toastService: ToastService) {}

  public httpError(error: HttpErrorResponse) {
    const message = Array.isArray(error.error?.message) ? error.error?.message[0] : error.error?.message;
    this.toastService.toast({
      toastType: 'error',
      title: error.statusText,
      message,
    });
  }
}
