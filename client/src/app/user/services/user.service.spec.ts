import { userMock } from '../mock/index';
import { TestBed } from '@angular/core/testing';

import { IUser } from '@user/types/user.interface';
import { fakeUserApiService, searchParams } from '../mock';
import { UserApiService } from './user-api.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserApiService,
          useValue: fakeUserApiService
        },
        UserService
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call findUsers and return users array', () => {
    let users: IUser[] | undefined;

    service.findUsers(searchParams).subscribe((value) => users = value);

    expect(fakeUserApiService.findUsers).toHaveBeenCalledWith(searchParams);
    expect(users).toEqual([userMock]);
  });

  it('should call getUser and return user', () => {
    let user: IUser | undefined;

    service.getUser(userMock._id).subscribe((value) => user = value);

    expect(fakeUserApiService.getUser).toHaveBeenCalledOnceWith(userMock._id);
    expect(user).toEqual(userMock);
  });

  it('should call updateUser and return user', () => {
    let user: IUser | undefined;

    service.updateUser(userMock._id, userMock).subscribe((value) => user = value);

    expect(fakeUserApiService.updateUser).toHaveBeenCalledOnceWith(userMock._id, userMock);
    expect(user).toEqual(userMock);
  });
});
