import { AppDataSource } from '../db/ormconfig';
import bcrypt from 'bcrypt';

import { UserEntity } from '../db/entities/userEntity';
import { NewUserI, UserI } from '../interfaces/user';
import { createPhoneWithQueryRunner } from './phone';
import { createAddressWithQueryRunner } from './address';
import InvoiceError from '../utils/invoiceError';
import { findRoles } from './role';
import { errorType } from '../utils/erroTypes';

export const createUser = async (user: NewUserI): Promise<void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.phones = await createPhoneWithQueryRunner(queryRunner, user.phones);
    newUser.addresses = await createAddressWithQueryRunner(
      queryRunner,
      user.addresses
    );
    newUser.password = bcrypt.hashSync(user.password, 10);
    newUser.dni = user.dni;
    newUser.roles = user.roles;
    newUser.createdBy = user.createdBy;

    const userCreated = await queryRunner.manager.save(newUser);
    console.log(
      `user_service: createUser, usercreated with id: ${userCreated.id}`
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new InvoiceError('db', '', err);
  } finally {
    await queryRunner.release();
  }
};

export const getUserByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  const query = AppDataSource.getRepository(UserEntity);
  try {
    return await query
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getUserRolesById = async (
  id: string
): Promise<UserEntity | null> => {
  const query = AppDataSource.getRepository(UserEntity);
  try {
    return await query
      .createQueryBuilder('user')
      .select(['user.roles'])
      .where('user.id = :id', { id })
      .getOne();
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getAllUsers = async (): Promise<UserI[]> => {
  try {
    const query = AppDataSource.getRepository(UserEntity);
    const userEntities = await query.find({
      relations: ['phones', 'addresses'],
    });
    const allRoles = await findRoles();
    const user = userEntities.map((userEntitie) => {
      const roles = allRoles
        .filter((role) => userEntitie.roles.includes(role.id))
        .map((r) => r.name);
      return { ...userEntitie, roles };
    });
    return user;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const getUserById = async (id: string): Promise<UserI | null> => {
  try {
    const query = AppDataSource.getRepository(UserEntity);
    const userEntitie = await query.findOne({
      where: { id },
      relations: ['phones', 'addresses'],
    });
    const allRoles = await findRoles();
    const roles = allRoles
      .filter((role) => userEntitie?.roles.includes(role.id))
      .map((r) => r.name);
    return userEntitie ? { ...userEntitie, roles } : null;
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const updateUserById = async (
  user: UserI,
  id: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(UserEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id= :id', { id })
      .execute();
    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'user not found');
    }
    console.log(`user_service: updateUserById,  userUpdated with id: ${id}`);
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};

export const deactivateUserById = async (
  id: string,
  updatedBy: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(UserEntity);
    const userUpdated = await query
      .createQueryBuilder()
      .update(UserEntity)
      .set({ isActive: false, updatedBy })
      .where('id= :id', { id })
      .execute();

    if (userUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'user not found');
    }
    console.log(
      `user_service: deactivateUserById,  userDeactivate with id: ${id}`
    );
  } catch (err) {
    throw new InvoiceError('db', '', err);
  }
};
