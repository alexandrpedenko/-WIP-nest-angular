import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from '@auth/repository/auth.repository';
import { AuthResponseDto } from '@auth/dto/response';
import { LogInUserDto, CreateUserDto } from '@auth/dto/request';
import { RESPONSE_MESSAGES } from '@constants/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

  public async login(userPayload: LogInUserDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findOne({ email: userPayload.email });
    if (user === null) {
      throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.BAD_REQUEST);
    }
    const { _id, email, userName, password } = user;

    if (await this.comparePasswords(userPayload.password, password)) {
      const [accessToken, refreshToken] = await this.generateJwt({
        id: _id,
        email: email
      });
      await this.authRepository.findOneAndUpdate({
        entityFilterQuery: { _id },
        entityData: { refreshToken },
      });
      return {
        user: { _id, email, userName, refreshToken },
        accessToken,
      };
    }

    throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.BAD_REQUEST);
  }

  public async registerUser(user: CreateUserDto): Promise<AuthResponseDto> {
    const hashedPassword = await this.hashPassword(user.password);
    const { _id, email, userName } = await this.authRepository.create({
      email: user.email,
      userName: user.userName,
      password: hashedPassword,
    });
    const [accessToken, refreshToken] = await this.generateJwt({ 
      id: _id,
      email: user.email,
    });

    await this.authRepository.findOneAndUpdate({
      entityFilterQuery: { _id },
      entityData: { refreshToken },
    });
    return {
      user: { _id, email, userName, refreshToken },
      accessToken,
    };
  }

  public async logout(id: string) {
    await this.authRepository.findOneAndUpdate({
      entityFilterQuery: { 
        _id: id,
        refreshToken: { $ne: null }
      },
      entityData: { refreshToken: null },
    });
  }

  public async regenerateRefreshToken(_id: string, oldRefreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.authRepository.findOne({ _id });
    if (user === null) {
      throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.UNAUTHORIZED);
    }
    const { email, refreshToken } = user;
    if (refreshToken !== oldRefreshToken) {
      throw new HttpException(RESPONSE_MESSAGES.invalidUserCredentials, HttpStatus.UNAUTHORIZED);
    }

    const [ accessToken, newRefreshToken ] = await this.generateJwt({ email, id: _id });
    await this.authRepository.findOneAndUpdate({
        entityFilterQuery: { _id },
        entityData: { refreshToken: newRefreshToken },
    });
    return { accessToken, refreshToken: newRefreshToken };
  }

  public async isUserExists(email: string): Promise<boolean> {
    const existedUser = await this.authRepository.findOne({ email });
    if (existedUser === null) {
      return false;
    }
    return true;
  }

  private async generateJwt({ id, email }: { id: string, email: string }): Promise<string[]> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ 
        user: {
          id,
          email,
        }
      }, { secret: this.configService.get('JWT_SECRET'), expiresIn: 60 * 15 }),

      this.jwtService.signAsync({ 
        user: {
          id,
          email,
        }
      }, { secret: this.configService.get('JWT_REFRESH'), expiresIn: 60 * 60 * 24 * 7 }),
    ]);
    return [accessToken, refreshToken];
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
