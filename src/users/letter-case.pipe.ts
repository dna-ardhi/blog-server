import { Injectable, PipeTransform } from '@nestjs/common';
import { Utilities } from 'src/helpers/utilities.helpers';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
@Injectable()
export class LetterCasePipe implements PipeTransform {
  constructor(private utilities: Utilities) {}
  transform(value: UpdateUserDto) {
    const result = { ...value };
    result.email_address = result.email_address?.toLowerCase();

    result.first_name = result.first_name
      ? this.utilities.capitalize(result.first_name)
      : result.first_name;

    result.last_name = result.last_name
      ? this.utilities.capitalize(result.last_name)
      : result.last_name;

    return result;
  }
}
