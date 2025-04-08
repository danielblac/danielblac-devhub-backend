import { IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
