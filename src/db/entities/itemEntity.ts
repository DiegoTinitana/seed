import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pvp } from '../../interfaces/items';
import { CategoryEntity } from './categoryEntity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ unique: true, nullable: true })
  code!: string;

  @Column({ unique: true, nullable: true })
  barCode!: string;

  @Column({ default: false })
  hasIva!: boolean;

  @Column({ default: 0 })
  purchasePrice!: number;

  @Column({ default: 0 })
  stock!: number;

  @Column('jsonb')
  pvps!: Pvp[];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  photo!: string;

  @ManyToMany(() => CategoryEntity, { cascade: true })
  @JoinTable()
  categories!: CategoryEntity[];
}
