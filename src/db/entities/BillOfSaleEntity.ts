import { Column, Entity, OneToMany } from 'typeorm';
import { BillEntity } from './BillEntity';
import { BillOfSalesDetailEntity } from './BillOfSaleDetailEntity';

@Entity('bill_of_sales')
export class BillOfSalesEntity extends BillEntity {
  @Column()
  isActive!: boolean;

  @OneToMany(() => BillOfSalesDetailEntity, (detail: BillOfSalesDetailEntity) => detail.bill, {eager: true, cascade: true})
  details!: BillOfSalesDetailEntity [];
}
