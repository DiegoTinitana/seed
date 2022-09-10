import { AppDataSource } from '../db/ormconfig';

import InvoiceError from '../utils/invoiceError';
import { errorType } from '../utils/erroTypes';
import { NewClientI } from '../interfaces/client';
import { ClientEntity } from '../db/entities/clientEntity';

export const createClient = async (client: NewClientI): Promise<void> => {
  const queryRunner = AppDataSource.getRepository(ClientEntity);

  try {
    const clientCreated = await queryRunner.save(client);
    console.log(
      `client_service: createClient, clientCreated with id: ${clientCreated.id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getAllClients = async (): Promise<NewClientI[]> => {
  try {
    const query = AppDataSource.getRepository(ClientEntity);
    const clients = await query.find();
    return clients;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getClientById = async (id: string): Promise<NewClientI | null> => {
  try {
    const query = AppDataSource.getRepository(ClientEntity);
    const clientEntitie = await query.findOne({
      where: { id }
    });
    return clientEntitie;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const updateClientById = async (
  client: NewClientI,
  id: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ClientEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(ClientEntity)
      .set(client)
      .where('id= :id', { id })
      .execute();
    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'client not found');
    }
    console.log(`client_service: updateClientById,  clientUpdated with id: ${id}`);
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const deactivateClientById = async (
  id: string,
  updatedBy: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ClientEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(ClientEntity)
      .set({ isActive: false, updatedBy })
      .where('id= :id', { id })
      .execute();

    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'client not found');
    }
    console.log(
      `user_service: deactivateClientById,  ClientDeactivate with id: ${id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getClientByDni = async (dni: string): Promise<NewClientI | null> => {
  try {
    const query = AppDataSource.getRepository(ClientEntity);
    const clientEntitie = await query.findOne({
      where: { dni }
    });
    return clientEntitie;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};
