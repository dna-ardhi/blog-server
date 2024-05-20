import { Utilities } from '@/helpers/utilities.helpers';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CapitalizePipe<T> implements PipeTransform {
  private keys: Array<keyof T>;
  private utilities: Utilities = new Utilities();

  constructor(keys: Array<keyof T>) {
    this.keys = keys;
  }

  transform(value: T, metadata: ArgumentMetadata): T {
    let result = value;

    if (metadata.type === 'body') {
      result = { ...value };
    }

    this.keys.forEach((key) => {
      if (result[key]) {
        result[key] = <T[keyof T]>(
          this.utilities.capitalize(value[key] as string)
        );
      }
    });

    return result;
  }
}
