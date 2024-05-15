import { Utilities } from '@/helpers/utilities.helpers';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CapitalizePipe<T> implements PipeTransform {
  private keys: Array<keyof T>;
  private utilities: Utilities = new Utilities();

  constructor(keys: Array<keyof T>) {
    this.keys = keys;
  }

  transform(value: T): T {
    const result = { ...value };

    this.keys.forEach((key) => {
      result[key] = <T[keyof T]>this.utilities.capitalize(value[key] as string);
    });

    return result;
  }
}
