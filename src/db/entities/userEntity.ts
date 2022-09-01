import { Entity, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './addressEntity';
import { PersonEntity } from './person';
import { PhoneEntity } from './phoneEntity';

@Entity('users')
export class UserEntity extends PersonEntity {
  @Column({select: false})
  password!: string;

  @Column('jsonb', { nullable: true })
  roles!: string[];

  @OneToMany(() => PhoneEntity, (phone: PhoneEntity) => phone.user, {eager: true, cascade: true})
  phones!: PhoneEntity[];

  @OneToMany(() => AddressEntity, (address: AddressEntity) => address.user, {eager: true, cascade: true})
  addresses!: AddressEntity[];
}

