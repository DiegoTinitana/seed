export interface NewBillI {
  id?: string;
  name: string;
  dni: string;
  address: string;
  date: Date;
  taxSubTotal: number;
  zeroSubTotal: number;
  discountTota: number;
  tax: number;
  total: number;
  isActive: boolean;
  details: Detail[];
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Detail {
  id?: string;
  code: string;
  amount: number;
  detail: string;
  unitPrice: number;
  tax: number;
  discount: number;
  total: number;
}

export interface TotalBill {
  subTotalTax: number
  subTotalZero: number
  totaltax: number
  totalDiscount: number
  details: Detail []
}