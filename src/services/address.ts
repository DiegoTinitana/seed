import { AppDataSource } from '../db/ormconfig';

import { CommonI } from '../interfaces/user';
import { AddressEntity } from '../db/entities/addressEntity';
import InvoiceError from '../utils/invoiceError';
import { errorType } from '../utils/erroTypes';
import { UserEntity } from '../db/entities/userEntity';

export const createAddress = async (
  userId: string,
  address: CommonI[]
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(AddressEntity);
    const newAddress = await query
      .createQueryBuilder()
      .insert()
      .into(AddressEntity)
      .values(address)
      .execute();

    await query
      .createQueryBuilder()
      .relation(UserEntity, 'address')
      .of(userId)
      .add(newAddress.identifiers);
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const updateAddressById = async (
  id: string,
  phone: CommonI
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(AddressEntity);
    const addresUpdated = await query
      .createQueryBuilder()
      .update(AddressEntity)
      .set(phone)
      .where('id= :id', { id })
      .execute();
    if (addresUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'addres not found');
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};
