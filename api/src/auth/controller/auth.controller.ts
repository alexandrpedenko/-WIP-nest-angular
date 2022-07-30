import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserModel } from '@schemas/user.schema';
import { RESPONSE_MESSAGES } from '@constants/user';
import { CreateUserDto, LogInUserDto } from '@auth/dto/request';
import { AuthService } from '@auth/services/auth.service';
import { LoginResponseDto } from '@auth/dto/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    if (await this.authService.isUserExists(createUserDto.email)) {
      throw new HttpException(RESPONSE_MESSAGES.userRegistered, HttpStatus.BAD_REQUEST);
    }
    return await this.authService.createUser(createUserDto);
  }

  @Post('/login')
  async logInUser(@Body() logInUserDto: LogInUserDto): Promise<LoginResponseDto> {
    return await this.authService.login(logInUserDto);
  }
}
