import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateGamzContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  message: string;
}
