import { IUser } from '@user/types/user.interface';
import { of } from "rxjs";
import { UserApiService } from "../services/user-api.service";

export const userMock: IUser = {
  _id: '123id',
  email: 'somemock@email.com',
  userName: 'John',
  profileImage: 'image string',
  refreshToken: 'test',
  occupation: 'designer',
  company: 'test company',
};

export const searchParams = {
  searchField: 'user',
  searchValue: 'John',
  skip: 10,
  limit: 10,
};
export const usersMock = [ userMock ];


export const findUsersExpectedUrl = `/api/users?searchField=${searchParams.searchField}&searchValue=${searchParams.searchValue}&skip=${searchParams.skip}&limit=${searchParams.limit}`;
export const getUserUrl = `/api/users/${userMock._id}`;

export const  fakeUserApiService = jasmine.createSpyObj<UserApiService>(
  'UserApiService',
  {
    findUsers: of([userMock]),
    getUser: of(userMock),
    updateUser: of(userMock),
  }
);
