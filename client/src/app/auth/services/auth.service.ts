import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthApiService } from '@auth/services/auth-api.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthInput, AuthResponse } from '@auth/types';
import { UnsubscribeSubject } from '@shared/utils/rxjs-unsubscribe';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private unsubscribeSubject = new UnsubscribeSubject();
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
    this.authApi.logout();
    this.localStorage.delete('jwt_token');
    this.localStorage.delete('jwt_token_refresh');
    this.loggedInUser.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  public setRefreshingToken(): void {
    interval(1000 * 10 * 1).pipe(
      tap(() => {
        console.log('Test refresh')
      }),
      mergeMap(() => {
        const refreshToken = this.localStorage.get<string>('jwt_token_refresh');
        return this.authApi.refreshToken(refreshToken);
      }),
      takeUntil(this.unsubscribeSubject),
    ).subscribe(response => {
      this.localStorage.set<string>('jwt_token', response.accessToken);
      this.localStorage.set<string>('jwt_token_refresh', response.refreshToken);
    });
  }

  destroySubscribes() {
    this.unsubscribeSubject.destroy();
  }

  private handleAuth(result: AuthResponse): void {
    const { accessToken, user } = result;
    this.localStorage.set<string>('jwt_token', accessToken);
    this.localStorage.set<string>('jwt_token_refresh', user.refreshToken);
    this.loggedInUser.next(result);
    this.router.navigateByUrl('/overview');
  }

  private checkIsUserLoggedIn(): void {
    const userFromStorage = this.localStorage.get<AuthResponse>('jwt_token');
    userFromStorage ? this.loggedInUser.next(userFromStorage) : this.loggedInUser.next(null);
  }
}
