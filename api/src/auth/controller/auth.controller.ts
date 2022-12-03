import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RESPONSE_MESSAGES } from '@constants/user';
import { CreateUserDto, LogInUserDto } from '@auth/dto/request';
import { AuthService } from '@auth/services/auth.service';
import { AuthResponseDto } from '@auth/dto/response';
import { Serialize } from '@decorators/serialize.decorator';
import { JwtAuthGuard, JwtRefreshAuthGuard } from '@auth/guards';
import { GetCurrentUserId } from '@decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(AuthResponseDto)
  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const isUserExists = await this.authService.isUserExists(createUserDto.email)
    if (isUserExists) {
      throw new HttpException(RESPONSE_MESSAGES.userRegistered, HttpStatus.BAD_REQUEST);
    }
    return await this.authService.registerUser(createUserDto);
  }

  @Serialize(AuthResponseDto)
  @Post('/login')
  async logInUser(@Body() logInUserDto: LogInUserDto): Promise<AuthResponseDto> {
    return await this.authService.login(logInUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logoutUser(@GetCurrentUserId('id') id: string): Promise<void> {
    await this.authService.logout(id);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId('refreshToken') refreshToken: string, 
    @GetCurrentUserId('id') id: string
  )  {
    return await this.authService.regenerateRefreshToken(id, refreshToken);
  }
}
