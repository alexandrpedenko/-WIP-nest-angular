import { Injectable } from '@nestjs/common';

import { UserModel } from '@schemas/user.schema';
import { UsersRepository } from '@users/repository/users.repository';
import { UpdateUserDto } from '@users/dto/request';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<UserModel> {
    return await this.usersRepository.findOne({ userId });
  }

  async getAllUsers(skip: number, limit: number): Promise<UserModel[]> {
    return await this.usersRepository.find(skip, limit);
  }

  async updateUser(
    id: string,
    userUpdates: UpdateUserDto,
  ): Promise<UserModel> {
    return await this.usersRepository.findOneAndUpdate({ id }, userUpdates);
  }

  async deleteById(userId: string): Promise<UserModel> {
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
