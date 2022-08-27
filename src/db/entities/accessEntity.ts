import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('access')
export class AccessEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  route!: string;

  @Column()
  method!: string;

  @Column('jsonb', { nullable: true })
  roles!: string[];
}
