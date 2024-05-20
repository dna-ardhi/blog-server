import { Roles } from '@/auth/entities/roles.entity';
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

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
