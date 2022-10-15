import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthApiService } from '@auth/services/auth-api.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthResponse } from '@auth/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser = new BehaviorSubject<AuthResponse | null>(null);
  loggedInUser$: Observable<AuthResponse | null>

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private localStorage: LocalStorageService,
  ) {
    this.checkIsUserLoggedIn();
    this.loggedInUser$ = this.loggedInUser.asObservable();
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.authApi.login(email, password).pipe(
      tap((result: AuthResponse) => {
        this.handleAuth(result);
      })
    );
  }

  public logout() {
    this.localStorage.delete('jwt_token');
    this.loggedInUser.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  private handleAuth(result: AuthResponse) {
    this.localStorage.set<AuthResponse>('jwt_token', result);
    this.loggedInUser.next(result);
    this.router.navigateByUrl('/overview');
  }

  private checkIsUserLoggedIn() {
    const userFromStorage = this.localStorage.get<AuthResponse>('jwt_token');
    console.log(userFromStorage);
    userFromStorage ? this.loggedInUser.next(userFromStorage) : this.loggedInUser.next(null);
  }
}
