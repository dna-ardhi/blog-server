import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menus } from './entities/menus.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.manager.getTreeRepository(Menus).insert(createMenuDto);
  }

  async findAll() {
    return this.manager.getTreeRepository(Menus).findTrees();
  }

  async findOne(id: number) {
    return this.manager.getTreeRepository(Menus).findOneBy({ id });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.manager
      .getTreeRepository(Menus)
      .createQueryBuilder()
      .update()
      .set(updateMenuDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return this.manager.getTreeRepository(Menus).delete(id);
  }
}
