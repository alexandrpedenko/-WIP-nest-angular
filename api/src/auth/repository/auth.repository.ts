import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserModel, UserDocument } from '@schemas/user.schema';
import { EntityRepository } from '@database/entity.repository';

@Injectable()
export class AuthRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }
}
