import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LetterCasePipe } from './letter-case.pipe';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HelpersModule],
  controllers: [UsersController],
  providers: [UsersService, LetterCasePipe],
  exports: [UsersService, LetterCasePipe],
})
export class UsersModule {}
