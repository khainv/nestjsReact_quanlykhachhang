import {
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddUsersDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  use_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  use_phone?: string | null;

  @IsOptional()
  @IsEmail()
  @MaxLength(191)
  use_email?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  use_sex?: number;

  @IsOptional()
  @IsDateString()
  use_birthday?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  use_img?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  use_address?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2])
  use_type?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2, 3])
  use_status?: number;
}
