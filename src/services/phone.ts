import { PhoneEntity } from '../db/entities/phoneEntity';
import { UserEntity } from '../db/entities/userEntity';
import { AppDataSource } from '../db/ormconfig';
import { CommonI } from '../interfaces/user';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const createPhone = async (
  userId: string,
  phones: CommonI[]
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(PhoneEntity);
    const newPhones = await query
      .createQueryBuilder()
      .insert()
      .into(PhoneEntity)
      .values(phones)
      .execute();

    await query
      .createQueryBuilder()
      .relation(UserEntity, 'phones')
      .of(userId)
      .add(newPhones.identifiers);
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const updatePhoneById = async (
  id: string,
  phone: CommonI
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(PhoneEntity);
    const phoneUpdated = await query
      .createQueryBuilder()
      .update(PhoneEntity)
      .set(phone)
      .where('id= :id', { id })
      .execute();
    if (phoneUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'phone not found');
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};
