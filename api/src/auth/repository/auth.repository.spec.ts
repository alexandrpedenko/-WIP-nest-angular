import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument, UserModel } from '@schemas/user.schema';
import { UserMockModel } from '@schemas/mock/user-mock.model';
import { userStub } from '@users/test/stubs/user.stub';
import { AuthRepository } from './auth.repository';


describe('AuthRepository', () => {
  let authRepository: AuthRepository;

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AuthRepository,
          {
            provide: getModelToken(UserModel.name),
            useValue: UserMockModel,
          },
        ],
      }).compile();

      authRepository = moduleRef.get<AuthRepository>(AuthRepository);
    });

    describe('when create is called', () => {
      let user: UserDocument;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(UserMockModel.prototype, 'save');
        constructorSpy = jest.spyOn(UserMockModel.prototype, 'constructorSpy');
        user = await authRepository.create(userStub());
      });

      test('should call the userModel', () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(constructorSpy).toHaveBeenCalledWith(userStub())
      });

      test('should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});