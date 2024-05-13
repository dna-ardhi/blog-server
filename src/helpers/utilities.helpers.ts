import { Injectable } from '@nestjs/common';

@Injectable()
export class Utilities {
  capitalize(words: string): string {
    return words
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
