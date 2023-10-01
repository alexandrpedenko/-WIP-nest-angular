import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@users/controller/users.controller';
import { UsersService } from '@users/service/users.service';
import { userStub } from '@users/test/stubs/user.stub';
import { UserDocument } from '@schemas/user.schema';
import { UpdateUserDto } from '@users/dto/request';

jest.mock('../service/users.service.ts');

describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    jest.clearAllMocks();
    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    let user: UserDocument;
    beforeEach(async () => {
      user = await controller.getUser(userStub()._id);
    });

    it('should call userService.getUser', () => {
      expect(usersService.getUserById).toBeCalledWith(userStub()._id);
    });
    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('getAllUsers', () => {
    let users: UserDocument[];
    beforeEach(async () => {
      users = await controller.getAllUsers();
    });

    it('should call userService.getAllUsers', () => {
      expect(usersService.getAllUsers).toHaveBeenCalled();
    });
    it('should return a users', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('updateUser', () => {
    let user: UserDocument;
    let updateUserDto: UpdateUserDto;

    beforeEach(async () => {
      updateUserDto = {
        _id: 'someUserId',
        email: 'some@email.com',
        username: 'Updated Name',
      }
      user = await controller.updateUser(userStub()._id, updateUserDto);
    })

    test('should call usersService', () => {
      expect(usersService.updateUser).toHaveBeenCalledWith(userStub()._id, updateUserDto);
    });
    test('should return a user', () => {
      expect(user).toEqual(userStub())
    });
  });
});
