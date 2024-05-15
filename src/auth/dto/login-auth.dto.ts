import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from './register-auth.dto';

export class LoginDto extends OmitType(RegisterDto, [
  'first_name',
  'last_name',
]) {}
