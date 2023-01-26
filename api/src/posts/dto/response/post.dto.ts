import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PostResponseDto {
  @Expose()
  @IsString()
  @Transform(({ obj }) => {
    return obj.author.toString();
  })
  author: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  date: string;

  @Expose()
  createdDate: Date;

  @Expose()
  @IsOptional()
  editedDate?: Date;
}