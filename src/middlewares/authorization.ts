import { Response, NextFunction } from 'express';
import { findAccessByUrlAndMethod } from '../services/access';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const checkAccess = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      method, route: { path },
      headers: { user }
    } = req;

    console.log(user);

    const hasAccess = await findAccessByUrlAndMethod(path, method, user.roles);

    if (!hasAccess) {
      throw new InvoiceError(errorType.authentication,'Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};
