import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CommonEnum } from '../../interfaces/common';

export class CommonEntity {
  @Column({
    type: 'varchar',
    length: 40,
    default: CommonEnum.PERSONAL
  })
  type!: CommonEnum;

  @Column()
  value!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  createdBy!: string;

  @Column({ nullable: true })
  updatedBy!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt!: Date;
}
