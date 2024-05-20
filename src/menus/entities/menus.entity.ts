import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

export enum MenuType {
  GROUP = 'group',
  COLLAPSE = 'collapse',
  ITEM = 'item',
}

@Entity()
@Tree('nested-set')
export class Menus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  @Generated('increment')
  sequence_number: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: MenuType })
  type: MenuType;

  @Column()
  icon: string;

  // @ManyToOne(() => Menus, (menu) => menu.children)
  // @JoinColumn({ name: 'parent_id' })
  @TreeParent()
  parent: Menus;

  // @OneToMany(() => Menus, (menu) => menu.parent)
  @TreeChildren()
  children: Menus[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
