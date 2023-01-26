import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@schemas/user.schema';
import { UsersController } from '@users/controller/users.controller';
import { UsersService } from '@users/service/users.service';
import { UsersRepository } from '@users/repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}
