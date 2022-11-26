import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthApiService } from '@auth/services/auth-api.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthInput, AuthResponse } from '@auth/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInUser = new BehaviorSubject<AuthResponse | null>(null);
  public loggedInUser$: Observable<AuthResponse | null>

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private localStorage: LocalStorageService,
  ) {
    this.checkIsUserLoggedIn();
    this.loggedInUser$ = this.loggedInUser.asObservable();
  }

  public login(authData: AuthInput): Observable<AuthResponse> {
    return this.authApi.login(authData).pipe(
      tap((result: AuthResponse) => {
        this.handleAuth(result);
      })
    );
  }

  public register(authData: AuthInput): Observable<AuthResponse> {
    return this.authApi.register(authData).pipe(
      tap((result: AuthResponse) => {
        this.handleAuth(result);
      })
    );
  }

  public logout(): void {
    this.localStorage.delete('jwt_token');
    this.loggedInUser.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  private handleAuth(result: AuthResponse): void {
    this.localStorage.set<AuthResponse>('jwt_token', result);
    this.loggedInUser.next(result);
    this.router.navigateByUrl('/overview');
  }

  private checkIsUserLoggedIn(): void {
    const userFromStorage = this.localStorage.get<AuthResponse>('jwt_token');
    userFromStorage ? this.loggedInUser.next(userFromStorage) : this.loggedInUser.next(null);
  }
}
