import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { IdSchema } from '../schemas/idSchema';

import * as clientService from '../services/client';

import { validator } from '../utils/validate';
import { ClientSchema } from '../schemas/clientSchema';

export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(ClientSchema, body);
    await clientService.createClient(body);
    res.status(httpStatus.CREATED).send('client Created');
  } catch (error) {
    next(error);
  }
};

export const getAllClients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clients = await clientService.getAllClients();
    res.status(httpStatus.OK).send(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const clients = await clientService.getClientById(id);
    res.status(httpStatus.OK).send(clients);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(ClientSchema, body);
    await clientService.updateClientById(body, params.id);
    res.status(httpStatus.NO_CONTENT).send('client Updated');
  } catch (error) {
    next(error);
  }
};

export const deleteClientById = async (
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
    await clientService.deactivateClientById(params.id, updatedBy);
    res.status(httpStatus.NO_CONTENT).send('client deativated');
  } catch (error) {
    next(error);
  }
};
