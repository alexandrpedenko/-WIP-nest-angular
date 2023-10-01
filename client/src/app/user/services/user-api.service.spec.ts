import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUser } from '@user/types/user.interface';
import { UserApiService } from './user-api.service';
import { findUsersExpectedUrl, getUserUrl, searchParams, userMock, usersMock } from '../mock';
import { HttpErrorResponse } from '@angular/common/http';


describe('User API service', () => {
  let service: UserApiService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should handle http error', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ProgressEvent('API error');
    let actualError: HttpErrorResponse | undefined;

    service.findUsers(searchParams).subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
    });

    const request = controller.expectOne(findUsersExpectedUrl);
    request.error(
      errorEvent,
      { status, statusText }
    );

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('should call findUsers and return users array', () => {
    let users: IUser[] | undefined;
    service.findUsers(searchParams).subscribe((value) => {
      users = value;
    })

    const request = controller.expectOne(findUsersExpectedUrl);
    request.flush([...usersMock]);
    controller.verify();

    expect(users).toEqual(usersMock);
  });

  it('should call getUser and return user', () => {
    let user: IUser | undefined;
    service.getUser(userMock._id).subscribe((value) => {
      user = value;
    });

    const request = controller.expectOne(getUserUrl);
    request.flush(userMock);
    controller.verify();

    expect(user).toEqual(userMock);
  });

  it('should call updateUser and return user', () => {
    let user: IUser | undefined;
    service.updateUser(userMock._id, userMock).subscribe((value) => {
      user = value;
    });

    const request = controller.expectOne({
      method: 'PATCH',
      url: getUserUrl
    })
    expect(request.request.body).toEqual(userMock);
    request.flush(userMock);
    controller.verify();

    expect(user).toEqual(userMock);
  });
});
