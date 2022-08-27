import { Response, NextFunction } from 'express';
import { decodeToken } from '../services/auth';
import { getUserRolesById } from '../services/user';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const checkToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      method,
      headers: { token }
    } = req;

    if (token === undefined || token === null) {
      throw new InvoiceError(errorType.authentication, 'Forbidden!');
    }
    const checkToken = token.split(' ').length > 1
      ? token.split(' ')[1]
      : token;
    const userId = await decodeToken(checkToken);

    const user = await getUserRolesById(userId);

    req.headers.user = user;
    if(method === 'POST') {
      req.body.createdBy = userId;
      req.body.updatedBy = userId;
    }
    if(method === 'PUT' || method === 'DELETE') {
      req.body.updatedBy = userId;
    }
    next();
  } catch (error) {
    next(error);
  }
};
