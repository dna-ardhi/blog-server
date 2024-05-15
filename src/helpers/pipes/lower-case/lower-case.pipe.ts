import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LowerCasePipe<T> implements PipeTransform {
  private keys: Array<keyof T>;

  constructor(keys: Array<keyof T>) {
    this.keys = keys;
  }

  transform(value: T): T {
    const result = { ...value };

    this.keys.forEach((key) => {
      result[key] = <T[keyof T]>(<string>value[key]).toLowerCase();
    });

    return result;
  }
}
