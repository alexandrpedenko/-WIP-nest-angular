import { Injectable } from '@nestjs/common';

import { UserDocument } from '@schemas/user.schema';
import { UsersRepository } from '@users/repository/users.repository';
import { UpdateUserDto } from '@users/dto/request';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ userId });
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.usersRepository.find({});
  }

  async updateUser(
    id: string,
    userUpdates: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate({ id }, userUpdates);
  }

  async deleteById(userId: string): Promise<UserDocument> {
    return await this.usersRepository.delete({ userId });
  }

  async isUserExists(id: string): Promise<boolean> {
    const existedUser = await this.usersRepository.findOne({ id });
    if (existedUser) {
      return true;
    }
    return false;
  }
}
