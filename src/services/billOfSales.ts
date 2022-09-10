import { AppDataSource } from '../db/ormconfig';

import InvoiceError from '../utils/invoiceError';
import { BillOfSalesEntity } from '../db/entities/BillOfSaleEntity';
import { NewBillI } from '../interfaces/bill';
import { errorType } from '../utils/erroTypes';

export const createBillOfSales = async (bill: NewBillI): Promise<void> => {
  const queryRunner = AppDataSource.getRepository(BillOfSalesEntity);

  try {
    const clientCreated = await queryRunner.save(bill);
    console.log(
      `client_service: createClient, clientCreated with id: ${clientCreated.id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getAllBillOfSales = async (): Promise<NewBillI[]> => {
  try {
    const query = AppDataSource.getRepository(BillOfSalesEntity);
    const bill = await query.find();
    return bill;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getBillOfSalesById = async (id: string): Promise<NewBillI | null> => {
  try {
    const query = AppDataSource.getRepository(BillOfSalesEntity);
    return await query.findOne({
      where: { id },
    });
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getBillOfSalesByUserAndDate = async (
  dni: string,
  date: Date
): Promise<NewBillI[] | null> => {
  try {
    const query = AppDataSource.getRepository(BillOfSalesEntity);
    return await query
      .createQueryBuilder('bill')
      .select()
      .where('dni= :dni', { dni })
      .andWhere('date= :date', { date })
      .getMany();
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getBillOfSalesBetweenDates = async (
  startDate: Date,
  endDate: Date
): Promise<NewBillI[] | null> => {
  try {
    const query = AppDataSource.getRepository(BillOfSalesEntity);
    return await query
      .createQueryBuilder('bill')
      .select()
      .where('bill.date > :startDate', { startDate })
      .andWhere('bill.date < :endDate', { endDate })
      .getMany();
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const cancelBillOfSales = async (
  id: string,
  updatedBy: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(BillOfSalesEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(BillOfSalesEntity)
      .set({ isActive: false, updatedBy })
      .where('id= :id', { id })
      .execute();
    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'BillOfSales not found');
    }
    console.log(
      `BillOfSales_service: updateBillOfSalesById,  BillOfSalesUpdated with id: ${id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};
