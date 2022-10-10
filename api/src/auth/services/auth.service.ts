import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from '@auth/repository/auth.repository';
import { LogInUserDto, CreateUserDto } from '@auth/dto/request';
import { UserModel } from '@schemas/user.schema';
import { LoginResponseDto } from '@auth/dto/response';
import { RESPONSE_MESSAGES } from '@constants/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,

  ) {}

  async login(user: LogInUserDto): Promise<LoginResponseDto> {
    const { email, password } = user;
    const existedUser = await this.authRepository.findOne({ email });
    if (!existedUser) {
      throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.BAD_REQUEST);
    }
    const isPasswordsValidated = await this.comparePasswords(password, existedUser.password)
    if (isPasswordsValidated) {
      return { access_token: await this.generateJwt({id: existedUser._id, email: existedUser.email}) };
    }
    throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.BAD_REQUEST);
  }

  async createUser(user: CreateUserDto): Promise<UserModel> {
    const hashedPassword = await this.hashPassword(user.password);
    return this.authRepository.create({
      email: user.email,
      userName: user.userName,
      password: hashedPassword,
    });
  }

  async isUserExists(email: string): Promise<boolean> {
    const existedUser = await this.authRepository.findOne({ email });
    if (existedUser === null) {
      return false;
    }
    return true;
  }

  private async generateJwt({ id, email }: {id: string, email: string}): Promise<string> {
    return this.jwtService.sign(
      { 
        user: {
          id,
          email,
        }
      }
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
