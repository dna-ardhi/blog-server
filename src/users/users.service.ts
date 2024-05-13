import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  insert(createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.userRepository.insert(createUserDto);
  }

  exist({ email_address }: CreateUserDto): Promise<boolean> {
    return this.userRepository.existsBy({ email_address });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        uuid: true,
        first_name: true,
        last_name: true,
        email_address: true,
        username: true,
      },
    });
  }

  findOne(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [{ username: userId }, { uuid: userId }],
    });
  }

  findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOneBy(where);
  }

  update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where('username = :userId OR uuid = :userId', { userId })
      .execute();
  }

  remove(userId: string): Promise<DeleteResult> {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .where('username = :userId OR uuid = :userId', { userId })
      .execute();
  }
}
