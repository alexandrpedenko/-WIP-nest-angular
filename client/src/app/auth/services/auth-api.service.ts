import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInput, AuthResponse } from '@auth/types';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) {}

  login({email, password}: AuthInput): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', {email, password});
  }

  register({email, password, userName}: AuthInput): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/register', {email, password, userName});
  }
}
