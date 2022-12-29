import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserApiService } from '@user/services/user-api.service';
import { IUser } from '@user/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private userApiService: UserApiService,
  ) {}

  getUser(userId: string): Observable<IUser> {
    return this.userApiService.getUser(userId);
  }

  updateProfile(userId: string, updateUserData: Partial<IUser>): Observable<IUser> {
    return this.userApiService.updateUser(userId, updateUserData);
  }
}
