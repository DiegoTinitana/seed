import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './commonEntity';
import { UserEntity } from './userEntity';

@Entity('phones')
export class PhoneEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.phones)
  user?: UserEntity;
}
