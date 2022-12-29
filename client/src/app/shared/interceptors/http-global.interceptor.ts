import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '@shared/services/error.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          this.errorService.httpError(error);
          if (error.status === 401) {
            this.authService.logout();
          }
          console.log(error);
          return EMPTY;
      }),
    );
  }
}
