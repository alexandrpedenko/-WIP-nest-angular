import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
 
export class GetEntityDto {
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