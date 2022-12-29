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
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import { UserDocument } from '@schemas/user.schema';
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
  async getAllUsers(@Query() query: GetEntityDto): Promise<UserDocument[]> {
    return this.usersService.getAllUsers(query);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<UserDocument> {
    return this.usersService.getUserById(userId);
  }

  @Delete(':userId')
  @UseGuards(CurrentUserGuard)
  async deleteUser(@Param('userId') userId: string): Promise<UserDocument> {
    return this.usersService.deleteById(userId);
  }


  @Patch(':userId')
  @UseGuards(CurrentUserGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const isUserExist = await this.usersService.isUserExists(userId);
    if (isUserExist) {
      return this.usersService.updateUser(userId, updateUserDto);
    }
    throw new HttpException(RESPONSE_MESSAGES.userNotFound, HttpStatus.NOT_FOUND);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor(
    'file',
    {
      storage: diskStorage({
        destination: './uploads/profileUploads',
        filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        }
      })
    }
  ))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<UserDocument> {
    const isUserExist = await this.usersService.isUserExists(req.user.id);
    if (isUserExist) {
      return this.usersService.updateUser(req.user.id, { profileImage: file.filename });
    }
    throw new HttpException(RESPONSE_MESSAGES.userNotFound, HttpStatus.NOT_FOUND);
  }
}
