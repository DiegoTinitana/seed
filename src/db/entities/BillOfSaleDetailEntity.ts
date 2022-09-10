import { Entity, ManyToOne } from 'typeorm';
import { BillDetailEntity } from './BillDetailEntity';
import { BillOfSalesEntity } from './BillOfSaleEntity';

@Entity('bill_of_sales_detail')
export class BillOfSalesDetailEntity extends BillDetailEntity {

  @ManyToOne(() => BillOfSalesEntity, (bill: BillOfSalesEntity) => bill.details)
  bill?: BillOfSalesEntity;
}