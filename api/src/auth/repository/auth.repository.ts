import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { UserModel, UserDocument } from '@schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<UserModel>): Promise<UserDocument> {
    return await this.userModel.findOne(userFilterQuery).exec();
  }
  async create(user: UserModel): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
