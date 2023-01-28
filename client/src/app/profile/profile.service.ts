import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '@user/services/user.service';
import { IUser } from '@user/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private userService: UserService) {}

  getUser(userId: string): Observable<IUser> {
    return this.userService.getUser(userId);
  }

  updateProfile(userId: string, updateUserData: Partial<IUser>): Observable<IUser> {
    return this.userService.updateUser(userId, updateUserData);
  }
}
