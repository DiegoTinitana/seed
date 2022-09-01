import { AppDataSource } from '../db/ormconfig';

import InvoiceError from '../utils/invoiceError';
import { errorType } from '../utils/erroTypes';
import { ProviderEntity } from '../db/entities/providerEntity';
import { NewProviderI } from '../interfaces/provider';

export const createProvider = async (provider: NewProviderI): Promise<void> => {
  const queryRunner = AppDataSource.getRepository(ProviderEntity);

  try {
    const providerCreated = await queryRunner.save(provider);
    console.log(
      `provider_service: createprovider, providerCreated with id: ${providerCreated.id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getAllProviders = async (): Promise<NewProviderI[]> => {
  try {
    const query = AppDataSource.getRepository(ProviderEntity);
    const providers = await query.find();
    return providers;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getProviderById = async (id: string): Promise<NewProviderI | null> => {
  try {
    const query = AppDataSource.getRepository(ProviderEntity);
    const providerEntitie = await query.findOne({
      where: { id }
    });
    return providerEntitie;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const updateProviderById = async (
  provider: NewProviderI,
  id: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ProviderEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(ProviderEntity)
      .set(provider)
      .where('id= :id', { id })
      .execute();
    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'provider not found');
    }
    console.log(`provider_service: updateproviderById,  providerUpdated with id: ${id}`);
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const deactivateProviderById = async (
  id: string,
  updatedBy: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ProviderEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(ProviderEntity)
      .set({ isActive: false, updatedBy })
      .where('id= :id', { id })
      .execute();

    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'provider not found');
    }
    console.log(
      `user_service: deactivateproviderById,  providerDeactivate with id: ${id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};
