import { Menus } from '@/menus/entities/menus.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import {
  DeleteResult,
  EntityManager,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from './entities/permissions.entity';
import { Roles } from './entities/roles.entity';

type AccessTokenPayload = {
  userId: string;
  full_name: string;
  email_address: string;
};

type AuthResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  salt: number = 10;
  privateKey: string;

  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
    @InjectEntityManager()
    private manager: EntityManager,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.privateKey = process.env.JWT_PRIVATE_KEY!;
  }

  private async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  private async comparePassword(
    input: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(input, encrypted);
  }

  private async generateToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      privateKey: this.privateKey,
    });
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const userExist = await this.usersService.exist(registerDto);

    if (userExist) {
      throw new ConflictException(
        'Alamat email yang anda masukkan telah terdaftar sebelumnya, silahkan gunakan alamat email lain',
      );
    }

    const hashedPassword = await this.hash(registerDto.password);
    registerDto.password = hashedPassword;

    const user = await this.usersService.insert(registerDto);

    const payload: AccessTokenPayload = {
      userId: user.raw.insertId,
      email_address: registerDto.email_address,
      full_name: `${registerDto.first_name} ${registerDto.last_name}`,
    };

    const accessToken = await this.generateToken(payload);

    return {
      access_token: accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    let password = false;
    const user = await this.usersService.getPassword(loginDto.email_address);

    if (user) {
      password = await this.comparePassword(loginDto.password, user.password);
    }

    if (!user || !password) {
      throw new UnauthorizedException(
        'Alamat Email atau Password Salah, Silahkan periksa kembali!',
      );
    }

    const payload: AccessTokenPayload = {
      userId: user.id,
      email_address: user.email_address,
      full_name: `${user.first_name} ${user.last_name}`,
    };

    const accessToken = await this.generateToken(payload);

    return {
      access_token: accessToken,
    };
  }

  async insertRole(createRoleDto: CreateRoleDTO): Promise<InsertResult> {
    const exist = await this.rolesRepository.existsBy({
      name: createRoleDto.name.toLowerCase(),
    });

    if (exist) {
      throw new ConflictException(
        'Nama role telah terdaftar, silahkan masukkan nama lain!',
      );
    }

    return this.rolesRepository
      .createQueryBuilder()
      .insert()
      .values(createRoleDto)
      .returning('*')
      .execute();
  }

  async updateRole(
    id: number,
    UpdateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return this.rolesRepository.update({ id: id }, UpdateRoleDto);
  }

  async findOneRole(id: number): Promise<Roles | null> {
    return this.rolesRepository.findOneBy({ id });
  }

  async findAllRoles(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  async deleteRole(id: number | number[]): Promise<DeleteResult> {
    return this.rolesRepository.delete(id);
  }

  async insertPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<InsertResult> {
    return this.permissionsRepository.insert(createPermissionDto);
  }

  async findAllAccess() {
    return this.manager
      .getTreeRepository(Menus)
      .findTrees({ relations: ['permissions'] });
  }

  private async mappingPermissions(data: Array<any>) {
    let result = [...data];
    result = result.map(async (item) => {
      const children = await this.manager
        .getTreeRepository(Menus)
        .findDescendants(item);
      console.log(children);
      return children;
    });
    return result;
  }
}
