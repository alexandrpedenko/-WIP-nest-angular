import { MockModel } from '@database/test/mock.model';
import { UserDocument } from '@schemas/user.schema';
import { userStub } from '@users/test/stubs/user.stub';

export class UserMockModel extends MockModel<Partial<UserDocument>> {
  protected entityStub = userStub();
}