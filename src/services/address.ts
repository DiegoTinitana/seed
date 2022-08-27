import { AppDataSource } from '../db/ormconfig';

import { CommonI } from '../interfaces/user';
import { AddressEntity } from '../db/entities/addressEntity';

export const createAddressWithQueryRunner = async (queryRunner: any, addresses: CommonI[]): Promise<AddressEntity[]> => {
  const newAddresses = addresses.map(address => {
    const newAddress = new AddressEntity();
    newAddress.type = address.type;
    newAddress.value = address.value;
    newAddress.description = address.description;
    return queryRunner.manager.save(newAddress);
  });
  return await Promise.all(newAddresses);
};

export const updateAddresById = async (id: string, address: CommonI): Promise<void> => {
  const query = AppDataSource.createQueryBuilder().update(AddressEntity);
  try {
    await query.set(address).where('id = :id', { id }).execute();
  } catch (err) {
    throw new Error();
  }
};
