import { round } from 'mathjs';
import { Detail, TotalBill } from '../interfaces/bill';
import { NewItemsI } from '../interfaces/items';
import { CommonI } from '../interfaces/user';
import { getItemsByIds } from '../services/item';

export const addCreatedAndUpdatedByToSchema = (
  schemas: CommonI[],
  createdBy: string,
  updatedBy: string
) => {
  return schemas.map((schema: CommonI) => {
    const newAddress = {
      ...schema,
      createdBy: createdBy,
      updatedBy: updatedBy,
    };
    return newAddress;
  });
};

export const createBillOfSalesDetails = async (
  details: any
): Promise<TotalBill> => {
  const itemIds = details.map((detail: any) => detail.id);
  const items = await getItemsByIds(itemIds);
  let totalIva = 0;
  let totalZero = 0;
  let tax = 0;
  const newDetails = items.map((item: NewItemsI) => {
    const detail = details.find((detail: any) => detail.id === item.id);
    const price = item.pvps.find((pvp: any) => pvp.id === detail.pvp);
    const unitPrice = price ? price.value : 0;

    const total = detail.amount * unitPrice;

    const iva = item.hasIva ? (12 / 100) * total : 0;
    const newitem: Detail = {
      code: item.code ?? '',
      amount: detail.amount,
      detail: item.name,
      unitPrice,
      total,
      tax: iva,
      discount: 0,
    };
    tax = round(tax + iva, 2) ;
    if (item.hasIva) {
      totalIva = totalIva + total;
    } else {
      totalZero = totalZero + total;
    }
    return newitem;
  });

  return {
    details: newDetails,
    subTotalTax: totalIva,
    subTotalZero: totalZero,
    totaltax: tax,
    totalDiscount: 0,
  };
};
