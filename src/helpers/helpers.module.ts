import { Module } from '@nestjs/common';
import { Utilities } from './utilities.helpers';

@Module({
  providers: [Utilities],
  exports: [Utilities],
})
export class HelpersModule {}
