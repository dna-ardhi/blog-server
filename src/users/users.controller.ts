import { CapitalizePipe } from '@/helpers/pipes/capitalize/capitalize.pipe';
import { LowerCasePipe } from '@/helpers/pipes/lower-case/lower-case.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@/helpers/pipes/zod-validation/zod-validation.pipe';
import { z } from 'zod';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ZodValidationPipe(z.string().trim().min(5))) id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @UsePipes(
    new CapitalizePipe<UpdateUserDto>(['first_name', 'last_name']),
    new LowerCasePipe<UpdateUserDto>(['email_address', 'username']),
  )
  @Patch(':id')
  update(
    @Param('id')
    userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') userId: string) {
    return this.usersService.remove(userId);
  }
}
