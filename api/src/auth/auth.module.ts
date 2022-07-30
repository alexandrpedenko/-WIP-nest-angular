import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from '@schemas/user.schema';
import { AuthController } from '@auth/controller/auth.controller';
import { AuthRepository } from '@auth/repository/auth.repository';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AuthService } from '@auth/services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        // TODO: change time after implementing refresh token functionality
        signOptions: { expiresIn: '10000s' }, 
      }),
    }),
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [AuthService, AuthRepository, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
