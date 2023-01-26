import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterQuery } from 'mongoose';
 
export class GetEntityDto<T> {
  @IsOptional()
  findQuery?: FilterQuery<T>;

  @Type(() => String)
  @IsOptional()
  @IsString()
  searchField?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  searchValue?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}