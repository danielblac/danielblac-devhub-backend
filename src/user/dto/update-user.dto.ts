import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
