import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { CapitalizePipe } from '@/helpers/pipes/capitalize/capitalize.pipe';
import { LowerCasePipe } from '@/helpers/pipes/lower-case/lower-case.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.insert(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UsePipes(
    new CapitalizePipe<UpdateUserDto>(['first_name', 'last_name']),
    new LowerCasePipe<UpdateUserDto>(['email_address', 'username']),
  )
  @Patch('edit/:user_id')
  update(
    @Param('user_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') userId: string) {
    return this.usersService.remove(userId);
  }
}
