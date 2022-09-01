import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { IdSchema } from '../schemas/idSchema';

import * as providerService from '../services/provider';

import { validator } from '../utils/validate';
import { ProviderSchema, UpdateProviderSchema } from '../schemas/providerSchema';

export const createProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(ProviderSchema, body);
    await providerService.createProvider(body);
    res.status(httpStatus.CREATED).send('Provider Created');
  } catch (error) {
    next(error);
  }
};

export const getAllProviders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Providers = await providerService.getAllProviders();
    res.status(httpStatus.CREATED).send(Providers);
  } catch (error) {
    next(error);
  }
};

export const getProviderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const Providers = await providerService.getProviderById(id);
    res.status(httpStatus.CREATED).send(Providers);
  } catch (error) {
    next(error);
  }
};

export const updateProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(UpdateProviderSchema, body);
    await providerService.updateProviderById(body, params.id);
    res.status(httpStatus.OK).send('Provider Updated');
  } catch (error) {
    next(error);
  }
};

export const deleteProviderById = async (
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
    await providerService.deactivateProviderById(params.id, updatedBy);
    res.status(httpStatus.OK).send('Provider deativated');
  } catch (error) {
    next(error);
  }
};
