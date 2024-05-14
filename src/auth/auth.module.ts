import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Permissions } from './entities/permissions.entity';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Permissions]),
    UsersModule,
    JwtModule,
    HelpersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
