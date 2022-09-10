import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BillDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({select: false})
  code!: string;

  @Column({type: 'decimal', precision:10, scale:2, default: 0})
  amount!: number;

  @Column()
  detail!: string;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  unitPrice!:number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  tax!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  discount!: number;

  @Column({type: 'decimal', precision:10, scale:8, default: 0.0})
  total!: number;
}