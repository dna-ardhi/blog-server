import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [UsersModule, JwtModule, HelpersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
