import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { UserDocument, UserModel } from '@schemas/user.schema';
import { UserMockModel } from '@schemas/mock/user-mock.model';
import { userStub } from '@users/test/stubs/user.stub';


describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let userModel: UserMockModel;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(UserModel.name),
          useClass: UserMockModel
        }
      ],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    userModel = moduleRef.get<UserMockModel>(getModelToken(UserModel.name));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('findOne', () => {
    let user: UserDocument;
    beforeEach(async () => {
      jest.spyOn(userModel, 'findOne');
      user = await usersRepository.findOne({_id: userStub()._id }, {_id: 0});
    });

    test('should call the userModel', () => {
      expect(userModel.findOne).toHaveBeenCalledWith({_id: userStub()._id }, {_id: 0});
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('find', () => {
    let users: UserDocument[];

    beforeEach(async () => {
      jest.spyOn(userModel, 'find');
      users = await usersRepository.find({}, {_id: 0});
    });

    test('should call the userModel', () => {
      expect(userModel.find).toHaveBeenCalledWith({}, {_id: 0});
    });

    test('should return a users', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('findOneAndUpdate', () => {
    let user: UserDocument;

    beforeEach(async () => {
      jest.spyOn(userModel, 'findOneAndUpdate');
      user = await usersRepository.findOneAndUpdate({ _id: userStub()._id }, userStub());
    });

    test('should call the userModel', () => {
      expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: userStub()._id }, userStub(), { new: true });
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('delete', () => {
    let user: UserDocument;

    beforeEach(async () => {
      jest.spyOn(userModel, 'findOneAndDelete');
      user = await usersRepository.delete({ _id: userStub()._id });
    });

    test('should call the userModel', () => {
      expect(userModel.findOneAndDelete).toHaveBeenCalledWith({ _id: userStub()._id });
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('deleteMany', () => {
    let result: boolean;

    beforeEach(async () => {
      jest.spyOn(userModel, 'deleteMany');
      result = await usersRepository.deleteMany({ _id: userStub()._id });
    });

    test('should call the userModel', () => {
      expect(userModel.deleteMany).toHaveBeenCalledWith({ _id: userStub()._id });
    });

    test('should return a user', () => {
      expect(result).toEqual(true);
    });
  });
});