import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule, HelpersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
