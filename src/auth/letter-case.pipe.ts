import { Injectable, PipeTransform } from '@nestjs/common';
import { Utilities } from 'src/helpers/utilities.helpers';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class LetterCasePipe implements PipeTransform {
  constructor(private utilities: Utilities) {}
  transform(value: RegisterDto | LoginDto) {
    const result = { ...value };
    result.email_address = result.email_address.toLowerCase();

    if (result instanceof RegisterDto) {
      result.first_name = this.utilities.capitalize(result.first_name);
      result.last_name = this.utilities.capitalize(result.last_name);
    }

    return result;
  }
}
