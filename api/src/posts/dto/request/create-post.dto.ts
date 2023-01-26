import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @Expose()
  @IsString()
  author: Types.ObjectId;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;
}
