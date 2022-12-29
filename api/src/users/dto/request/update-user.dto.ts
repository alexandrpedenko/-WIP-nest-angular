import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @Exclude()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  company?: string;
}
