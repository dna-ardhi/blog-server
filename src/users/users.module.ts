import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from 'src/helpers/helpers.module';
import { Users } from './entities/users.entity';
import { LetterCasePipe } from './letter-case.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), HelpersModule],
  controllers: [UsersController],
  providers: [UsersService, LetterCasePipe],
  exports: [UsersService, LetterCasePipe],
})
export class UsersModule {}
