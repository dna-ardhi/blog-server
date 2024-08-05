import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  insert(createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.userRepository.insert(createUserDto);
  }

  exist({ email_address }: CreateUserDto): Promise<boolean> {
    return this.userRepository.existsBy({ email_address });
  }

  findAll(options?: FindManyOptions<Users>): Promise<Users[]> {
    return this.userRepository.find(options);
  }

  findOne(userId: string): Promise<Users | null> {
    return this.userRepository.findOne({
      where: [{ username: userId }, { id: userId }],
    });
  }

  findOneBy(where: FindOptionsWhere<Users>): Promise<Users | null> {
    return this.userRepository.findOneBy(where);
  }

  getPassword(identifier: string): Promise<Users | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.password'])
      .where('email_address = :id OR username = :id', { id: identifier })
      .getOne();
  }

  update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where('username = :userId OR id = :userId', { userId })
      .execute();
  }

  remove(userId: string): Promise<DeleteResult> {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .where('username = :userId OR id = :userId', { userId })
      .execute();
  }
}
