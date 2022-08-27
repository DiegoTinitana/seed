import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './commonEntity';
import { UserEntity } from './userEntity';

@Entity('addresses')
export class AddressEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.addresses)
  user?: UserEntity;
}
