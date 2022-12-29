import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serializeHttpParams } from '@shared/utils/http-serialize';
import { IUser } from '@user/types/user.interface';
import { IGetUsersParams } from './types';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) {}

  findUsers(httpParams: IGetUsersParams) {
    return this.http.get<IUser[]>('/api/users', { params: serializeHttpParams(httpParams) });
  }

  getUser(userId: string) {
    return this.http.get<IUser>(`/api/users/${userId}`);
  }

  updateUser(userId: string, updateUserData: Partial<IUser>) {
    return this.http.patch<IUser>(`/api/users/${userId}`, updateUserData);
  }
}
