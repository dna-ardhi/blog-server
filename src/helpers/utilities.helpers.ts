import { Injectable } from '@nestjs/common';

@Injectable()
export class Utilities {
  compose<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => functions.reduceRight((result, fn) => fn(result), arg);
  }

  pipe<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => functions.reduce((result, fn) => fn(result), arg);
  }

  capitalize(words: string): string {
    return words
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  capitalizeObject<T extends Record<string, any>>(
    object: T,
    keys: Array<keyof T>,
  ): T {
    const result = { ...object };

    keys.forEach((key) => {
      result[key] = <T[keyof T]>this.capitalize(object[key]);
    });

    return result;
  }

  lowerCaseObject<T extends Record<string, any>>(
    object: T,
    keys: Array<keyof T>,
  ): T {
    const result = { ...object };

    keys.forEach((key) => {
      result[key] = <T[keyof T]>(<string>object[key]).toLowerCase();
    });

    return result;
  }
}
