import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@user/types/user.interface';
import { UserApiService } from './user-api.service';
import { IGetUsersParams } from './types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userApiService: UserApiService) { }

  findUsers(httpParams: IGetUsersParams) {
    return this.userApiService.findUsers(httpParams);
  }

  getUser(userId: string): Observable<IUser> {
    return this.userApiService.getUser(userId);
  }

  updateUser(userId: string, updateUserData: Partial<IUser>): Observable<IUser> {
    return this.userApiService.updateUser(userId, updateUserData);
  }
}
