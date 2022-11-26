import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';

import { UserModel } from '@schemas/user.schema';
import { RESPONSE_MESSAGES } from '@constants/user';
import { UsersService } from '@users/service/users.service';
import { Serialize } from '@decorators/serialize.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UserResponseDto } from '@users/dto/response';
import { UpdateUserDto } from '@users/dto/request';
import { CurrentUserGuard } from '@guards/current-user.guard';
import { GetEntityDto } from '@dtos/request'

@Controller('users')
@UseGuards(JwtAuthGuard)
@Serialize(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAllUsers(@Query() query: GetEntityDto): Promise<UserModel[]> {
    return this.usersService.getAllUsers(query);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<UserModel> {
    return this.usersService.getUserById(userId);
  }

  @Delete(':userId')
  @UseGuards(CurrentUserGuard)
  async deleteUser(@Param('userId') userId: string): Promise<UserModel> {
    return this.usersService.deleteById(userId);
  }


  @Patch(':userId')
  @UseGuards(CurrentUserGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const isUserExist = await this.usersService.isUserExists(userId);
    if (isUserExist) {
      return this.usersService.updateUser(userId, updateUserDto);
    }
    throw new HttpException(RESPONSE_MESSAGES.userNotFound, HttpStatus.NOT_FOUND);
  }
}
