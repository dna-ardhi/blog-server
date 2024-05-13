import { Injectable } from '@nestjs/common';

@Injectable()
export class Utilities {
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
