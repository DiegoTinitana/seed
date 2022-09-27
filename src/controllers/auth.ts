import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { CredentialsSchema } from '../schemas/credentialsSchema';
import { checkCredential } from '../services/auth';
import { signBillXml } from '../services/signBill';
import { validator } from '../utils/validate';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = req;
    await validator(CredentialsSchema, body);
    const credential = await checkCredential(body.email, body.password);

    res.status(httpStatus.OK).json({ credential });
  } catch (err) {
    next(err);
  }
};


export const test = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    signBillXml()
  } catch (err) {
    next(err);
  }
};
