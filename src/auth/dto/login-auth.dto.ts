import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
