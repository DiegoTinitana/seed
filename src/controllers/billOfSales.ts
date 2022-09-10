import { NextFunction, Request, Response } from 'express';
import { round } from 'mathjs';
import httpStatus from 'http-status-codes';
import { NewBillI, TotalBill } from '../interfaces/bill';
import { BillSchema } from '../schemas/billSchema';

import * as billOfSalesService from '../services/billOfSales';
import { getClientByDni, getClientById } from '../services/client';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';
import { createBillOfSalesDetails } from '../utils/utils';

import { validator } from '../utils/validate';

export const createBillOfSales = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(BillSchema, body);

    const client = await getClientByDni(body.dni);
    if (!client) {
      throw new InvoiceError(errorType.notFound, 'client not found', null);
    }

    const {
      subTotalTax,
      subTotalZero,
      totalDiscount,
      totaltax,
      details
    } =  await createBillOfSalesDetails(body.details);

    const newBill: NewBillI = {
      name: `${client.name} ${client.lastName}`,
      dni: client.dni,
      address: client.address,
      date: body.date,
      taxSubTotal: subTotalTax,
      zeroSubTotal: subTotalZero,
      discountTota: totalDiscount,
      tax: totaltax,
      total: subTotalTax + subTotalZero + totaltax - totalDiscount,
      details: details,
      createdBy: body.createdBy,
      updatedBy: body.updatedBy,
      isActive: true
    };
    await billOfSalesService.createBillOfSales(newBill);
    res.status(httpStatus.CREATED).send('Bill Created');
  } catch (error) {
    next(error);
  }
};


export const getAllBillOfSales = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
   const bills = await billOfSalesService.getAllBillOfSales();
    res.status(httpStatus.CREATED).send(bills);
  } catch (error) {
    next(error);
  }
};
