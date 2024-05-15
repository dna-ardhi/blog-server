import { Timestamp } from '@/helpers/entities.helpers';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Permissions, (permission) => permission.roles)
  @JoinTable({
    name: 'roles_permissions_association',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permissions[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;
}
