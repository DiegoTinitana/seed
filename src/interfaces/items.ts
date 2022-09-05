export interface NewItemsI {
  id?: string;
  name: string;
  description?: string;
  code?: string;
  barCode?: string;
  hasIva: boolean;
  purchasePrice: number;
  stock: number;
  pvps: Pvp[];
  isActive?: boolean
  photo?: string;
}

export interface Pvp {
  id: number;
  value: number;
  percent: number;
}
