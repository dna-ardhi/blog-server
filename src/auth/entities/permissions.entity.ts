import { Timestamp } from '@/helpers/entities.helpers';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Roles, (role) => role.permissions)
  roles: Roles[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;
}
