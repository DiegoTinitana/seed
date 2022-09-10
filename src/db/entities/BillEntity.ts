import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BillEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  dni!: string;

  @Column()
  address!: string;

  @Column()
  date!: Date;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  taxSubTotal!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  zeroSubTotal!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  discountTota!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  tax!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  total!: number;

  @Column({default: true})
  createdBy!: string;

  @Column({ nullable: true })
  updatedBy!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt!: Date;
}
