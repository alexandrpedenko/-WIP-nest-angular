import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serializeHttpParams } from '@shared/utils/http-serialize';
import { IUser } from '@user/types/user.interface';
import { IGetUsers } from './types';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) {}

  findUsers(httpParams: IGetUsers) {
    return this.http.get<IUser[]>('/api/users', { params: serializeHttpParams(httpParams) });
  }
}
