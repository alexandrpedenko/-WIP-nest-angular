import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserResponseDto {
  @Expose()
  @Transform(params => params.obj._id)
  _id?: string;

  @Expose()
  userName: string;

  @Expose()
  email: string;

  @Expose()
  @IsOptional()
  profileImage?: string;

  @Expose()
  @IsOptional()
  occupation?: string;

  @Expose()
  @IsOptional()
  company?: string;
}