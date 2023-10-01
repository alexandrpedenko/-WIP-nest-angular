import { UserDocument } from "@schemas/user.schema";

export const userStub = (): Partial<UserDocument> => ({
  _id: 'someUserId',
  email: 'some@email.com',
  password: 'hashedPassword',
  username: 'User Name',
});
