import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInstance, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  role_id: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsOptional()
  @IsInstance(File)
  avatar: File;
}
