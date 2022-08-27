import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { PhoneSchema } from '../schemas/phoneSchema';

import * as phoneService from '../services/phone';
import { validator } from '../utils/validate';

export const createPhones = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body, params } = req;
    await validator(PhoneSchema, body);
    body.userId = params.id;
    await phoneService.createPhone(body);
    res.status(httpStatus .CREATED).send('phone Created');
  } catch (error) {
    next(error);
  }
};