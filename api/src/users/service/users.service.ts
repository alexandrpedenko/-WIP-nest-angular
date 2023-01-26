import { Injectable } from '@nestjs/common';

import { UserDocument } from '@schemas/user.schema';
import { UsersRepository } from '@users/repository/users.repository';
import { UpdateUserDto } from '@users/dto/request';
import { GetEntityDto } from '@dtos/request';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(_id: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ _id });
  }

  async getAllUsers(query: GetEntityDto<UserDocument>): Promise<UserDocument[]> {
    return await this.usersRepository.find(query);
  }

  async updateUser(
    _id: string,
    userUpdates: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate({
      entityFilterQuery: { _id },
      entityData: userUpdates,
    });
  }

  async deleteById(_id: string): Promise<UserDocument> {
    return await this.usersRepository.delete({ _id });
  }

  async isUserExists(_id: string): Promise<boolean> {
    const existedUser = await this.usersRepository.findOne({ _id });
    if (existedUser) {
      return true;
    }
    return false;
  }
}
