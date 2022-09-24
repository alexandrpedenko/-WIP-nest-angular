import { userStub } from "@users/test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userStub()),
  getAllUsers: jest.fn().mockResolvedValue([userStub()]),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteById: jest.fn().mockResolvedValue(userStub()),
  isUserExists: jest.fn().mockResolvedValue(true),
});
