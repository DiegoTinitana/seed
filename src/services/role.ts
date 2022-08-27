import { In } from 'typeorm';
import { RoleEntity } from '../db/entities/roleEntity';
import { AppDataSource } from '../db/ormconfig';
import InvoiceError from '../utils/invoiceError';

export const findRolesByIds = async (
  roleIds: string[]
): Promise<RoleEntity[]> => {
  const queryRunner = AppDataSource.getRepository(RoleEntity);
  try {
    const roles = await queryRunner.find({ where: { id: In(roleIds) } });
    return roles;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const findRoles = async (): Promise<RoleEntity[]> => {
  const queryRunner = AppDataSource.getRepository(RoleEntity);
  try {
    const roles = await queryRunner.find();
    return roles;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};