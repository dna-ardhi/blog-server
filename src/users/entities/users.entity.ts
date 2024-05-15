import { Roles } from '@/auth/entities/roles.entity';
import { Timestamp } from '@/helpers/entities.helpers';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email_address: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'role_id' })
  role: number;

  @Column()
  password: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;
}
