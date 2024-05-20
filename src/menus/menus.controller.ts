import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';
import { CapitalizePipe } from '@/helpers/pipes/capitalize/capitalize.pipe';
import { LowerCasePipe } from '@/helpers/pipes/lower-case/lower-case.pipe';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UsePipes(
    new CapitalizePipe<CreateMenuDto>(['title']),
    new LowerCasePipe<CreateMenuDto>(['url']),
  )
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.findOne(id);
  }

  @UsePipes(
    new CapitalizePipe<UpdateMenuDto>(['title']),
    new LowerCasePipe<UpdateMenuDto>(['url']),
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
