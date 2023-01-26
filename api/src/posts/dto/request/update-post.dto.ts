import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @Expose()
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;
}
