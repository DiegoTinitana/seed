import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { UpdateUserSchema, UserSchema } from '../schemas/userSchema';
import { IdSchema } from '../schemas/idSchema';

import * as userService from '../services/user';

import { validator } from '../utils/validate';
import { CommonI } from '../interfaces/user';
import { addCreatedAndUpdatedByToSchema } from '../utils/utils';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(UserSchema, body);
    body.addresses = addCreatedAndUpdatedByToSchema(body.addresses, body.createdBy, body.updatedBy);
    body.phones = addCreatedAndUpdatedByToSchema(body.phones, body.createdBy, body.updatedBy);
    await userService.createUser(body);
    res.status(httpStatus.CREATED).send('User Created');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(httpStatus.CREATED).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const users = await userService.getUserById(id);
    res.status(httpStatus.CREATED).send(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(UpdateUserSchema, body);
    await userService.updateUserById(body, params.id);
    res.status(httpStatus.OK).send('User Updated');
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params,
      body: { updatedBy },
    } = req;
    await validator(IdSchema, params);
    await userService.deactivateUserById(params.id, updatedBy);
    res.status(httpStatus.OK).send('User deativated');
  } catch (error) {
    next(error);
  }
};
