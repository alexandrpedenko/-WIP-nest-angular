import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @Exclude()
  @IsOptional()
  _id: string;

  @IsEmail()
  @Exclude()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  userName: string;
}
