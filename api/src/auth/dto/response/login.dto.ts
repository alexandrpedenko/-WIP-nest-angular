import { Expose, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UserResponseDto } from '@users/dto/response';

export class AuthResponseDto {
  @IsString()
  @Expose()
  accessToken: string;

  @Type(() => UserResponseDto)
  @ValidateNested()
  @Expose()
  user: UserResponseDto;
}