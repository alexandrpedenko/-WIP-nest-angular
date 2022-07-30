import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @Transform(params => params.obj._id)
  _id: string

  @Expose()
  userName: string;

  @Expose()
  email: string;
}