
import { AccessEntity } from '../db/entities/accessEntity';
import { AppDataSource } from '../db/ormconfig';
import InvoiceError from '../utils/invoiceError';

export const findAccessByUrlAndMethod = async (route: string, method: string, roles: string[]): Promise<boolean> => {
  const queryRunner = AppDataSource.getRepository(AccessEntity);
  try {
    const access = await queryRunner.findOne({ where: { route, method } });
    return roles.some(role => access?.roles.includes(role));
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};
