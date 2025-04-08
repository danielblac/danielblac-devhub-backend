import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsUrl, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  cover_img?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  live_link?: string;

  @IsString()
  @IsOptional()
  github_link?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
