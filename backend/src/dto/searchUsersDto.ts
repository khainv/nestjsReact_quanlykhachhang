import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchUsersDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2, 3])
  use_status?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2])
  use_type?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsIn(['created_at', 'updated_at', 'use_name'])
  sort_by: 'created_at' | 'updated_at' | 'use_name' = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort_order: 'ASC' | 'DESC' = 'DESC';
}
