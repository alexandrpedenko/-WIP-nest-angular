import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument, UserModel } from '@schemas/user.schema';
import { UsersService } from '@users/service/users.service';
import { UserMockModel } from '@schemas/mock/user-mock.model';
import { UsersRepository } from '@users/repository/users.repository';
import { userStub } from '@users/test/stubs/user.stub';

describe('UserService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getModelToken(UserModel.name),
          useClass: UserMockModel
        }
      ],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    userService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUserById', () => {
    let user: UserDocument;
    beforeEach(async () => {
      jest.spyOn(userService, 'getUserById');
      jest.spyOn(usersRepository, 'findOne');
      user = await userService.getUserById(userStub()._id);
    });

    test('should call the userModel', () => {
      expect(usersRepository.findOne).toHaveBeenCalledWith({_id: userStub()._id });
    });
    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

});
