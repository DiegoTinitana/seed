import { Entity, Column } from 'typeorm';
import { PersonEntity } from './person';

@Entity('clients')
export class ClientEntity extends PersonEntity {
  @Column()
  phone!: string;

  @Column()
  address!: string;
}
