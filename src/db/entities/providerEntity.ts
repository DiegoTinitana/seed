import { Entity, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './addressEntity';
import { PersonEntity } from './person';
import { PhoneEntity } from './phoneEntity';

@Entity('users')
export class ProviderEntity extends PersonEntity {

  @Column()
  company!: string;

  @OneToMany(() => PhoneEntity, (phone: PhoneEntity) => phone.user)
  phones!: PhoneEntity[];

  @OneToMany(() => AddressEntity, (address: AddressEntity) => address.user)
  addresses!: AddressEntity[];
}

