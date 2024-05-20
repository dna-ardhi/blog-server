import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Menus, MenuType } from '../entities/menus.entity';

export class CreateMenuDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsEnum(MenuType)
  type: MenuType;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumberString()
  @IsOptional()
  parent: Menus;
}
