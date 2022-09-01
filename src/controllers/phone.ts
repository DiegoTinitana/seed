import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { IdSchema } from '../schemas/idSchema';
import { PhoneSchema, UpdatePhoneSchema } from '../schemas/phoneSchema';

import * as phoneService from '../services/phone';
import { addCreatedAndUpdatedByToSchema } from '../utils/utils';
import { validator } from '../utils/validate';

export const createPhones = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(PhoneSchema, body);
    const userId = body.userId;
    body.phones = addCreatedAndUpdatedByToSchema(body.phones, body.createdBy, body.updatedBy);
    await phoneService.createPhone(userId, body.phones);
    res.status(httpStatus .CREATED).send('phone Created');
  } catch (error) {
    next(error);
  }
};

export const updatePhones = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(UpdatePhoneSchema, body);
    await phoneService.updatePhoneById(params.id, body);
    res.status(httpStatus .CREATED).send('phone Updated');
  } catch (error) {
    next(error);
  }
};