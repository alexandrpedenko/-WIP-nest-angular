import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { mergeMap, takeWhile, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthApiService } from '@auth/services/auth-api.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthInput, AuthResponse } from '@auth/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInUser = new BehaviorSubject<string | null>(null);
  public loggedInUser$: Observable<string | null>

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
    interval(1000 * 60 * 3).pipe(
      takeWhile(() => this.loggedInUser.value !== null),
      mergeMap(() => {
        const refreshToken = this.localStorage.get<string>('jwt_token_refresh');
        return this.authApi.refreshToken(refreshToken);
      }),
    ).subscribe(response => {
      this.loggedInUser.next(response.accessToken);
      this.localStorage.set<string>('jwt_token', response.accessToken);
      this.localStorage.set<string>('jwt_token_refresh', response.refreshToken);
    });
  }

  private handleAuth(result: AuthResponse): void {
    const { accessToken, user } = result;
    this.localStorage.set<string>('jwt_token', accessToken);
    this.localStorage.set<string>('jwt_token_refresh', user.refreshToken);
    this.loggedInUser.next(accessToken);
    this.setRefreshingToken();
    this.router.navigateByUrl('/home');
  }

  private checkIsUserLoggedIn(): void {
    const userFromStorage = this.localStorage.get<string>('jwt_token');
    if (userFromStorage) {
      this.loggedInUser.next(userFromStorage);
      this.setRefreshingToken();
    } else {
      this.loggedInUser.next(null);
    }
  }
}
