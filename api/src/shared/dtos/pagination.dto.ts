import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
 
export class PaginationParams {
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