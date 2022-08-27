
import { QueryRunner } from 'typeorm';
import { PhoneEntity } from '../db/entities/phoneEntity';
import { AppDataSource } from '../db/ormconfig';
import { CommonI } from '../interfaces/user';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const createPhoneWithQueryRunner = async (queryRunner: QueryRunner, phones: CommonI[]): Promise<PhoneEntity[]> => {
  const newPhones = phones.map(async phone => {
    const newPhone = new PhoneEntity();
    newPhone.type = phone.type;
    newPhone.value = phone.value;
    newPhone.description = phone.description;
    return await queryRunner.manager.save(newPhone);
  });
  return await Promise.all(newPhones);
};

export const createPhone = async (phones: CommonI[]): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(PhoneEntity);
    await query.createQueryBuilder()
    .insert()
    .into(PhoneEntity)
    .values(phones)
    .execute();
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const updatePhoneById = async (queryRunner: QueryRunner, phones: CommonI[]): Promise<void> => {
  const phonesUpdates = phones.map(async (phone) => {
    const updatePhone = await queryRunner.manager.findOneBy(PhoneEntity, { id: phone.id });
    if (updatePhone != null) {
      updatePhone.value = phone.value;
      updatePhone.type = phone.type;
      updatePhone.description = phone.description;
      return await queryRunner.manager.save(updatePhone);
    }
  });

  await Promise.all(phonesUpdates);
};
