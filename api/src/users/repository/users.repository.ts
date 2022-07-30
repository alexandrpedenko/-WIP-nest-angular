import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserModel, UserDocument } from '@schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<UserModel>): Promise<UserDocument> {
    return await this.userModel.findOne(userFilterQuery).exec();
  }

  async find(usersFilterQuery: FilterQuery<UserModel>): Promise<UserDocument[]> {
    return this.userModel.find(usersFilterQuery).exec();
  }

  async delete(userFilterQuery: FilterQuery<UserModel>): Promise<UserDocument> {
    return this.userModel.findOneAndDelete(userFilterQuery).exec();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<UserModel>,
    user: Partial<UserModel>,
  ): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    }).exec();
  }
}
