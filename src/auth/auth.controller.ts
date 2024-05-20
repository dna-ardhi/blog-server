import { CapitalizePipe } from '@/helpers/pipes/capitalize/capitalize.pipe';
import { LowerCasePipe } from '@/helpers/pipes/lower-case/lower-case.pipe';
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
import { AuthService } from './auth.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(
    new CapitalizePipe<RegisterDto>(['first_name', 'last_name']),
    new LowerCasePipe<RegisterDto>(['email_address']),
  )
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UsePipes(new LowerCasePipe<LoginDto>(['email_address']))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UsePipes(new CapitalizePipe<CreateRoleDTO>(['name']))
  @Post('roles')
  async create(@Body() createRoleDto: CreateRoleDTO) {
    return this.authService.insertRole(createRoleDto);
  }

  @Get('roles')
  async findALlRoles() {
    return this.authService.findAllRoles();
  }

  @Get('roles/:id')
  async findOneRole(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOneRole(id);
  }

  @UsePipes(new CapitalizePipe<UpdateRoleDto>(['name']))
  @Patch('roles/:id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.authService.updateRole(id, updateRoleDto);
  }

  @Delete('roles/:id')
  async removeRole(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteRole(id);
  }
}
