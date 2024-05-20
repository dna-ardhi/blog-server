import { Menus } from '@/menus/entities/menus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Menus)
  @JoinColumn({ name: 'menu_id' })
  menu_id: number;

  @Column({ default: false })
  submenu: boolean;

  @ManyToMany(() => Roles, (role) => role.permissions)
  roles: Roles[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
