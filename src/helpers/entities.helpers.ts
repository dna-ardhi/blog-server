import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Timestamp {
  @CreateDateColumn({ name: 'created_at' })
  create: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update: Date;
}
