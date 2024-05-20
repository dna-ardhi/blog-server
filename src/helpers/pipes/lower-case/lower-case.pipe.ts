import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LowerCasePipe<T> implements PipeTransform {
  private keys: Array<keyof T>;

  constructor(keys: Array<keyof T>) {
    this.keys = keys;
  }

  transform(value: T, metadata: ArgumentMetadata): T {
    let result: T = value;

    if (metadata.type === 'body') {
      result = { ...value };
    }

    this.keys.forEach((key) => {
      if (value[key]) {
        result[key] = <T[keyof T]>(<string>value[key]).toLowerCase();
      }
    });

    return result;
  }
}
