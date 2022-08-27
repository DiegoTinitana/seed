import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { errorType } from '../utils/erroTypes';

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let status: number = httpStatus.INTERNAL_SERVER_ERROR;
  let msg: string;
  let errors: any;
  console.log(err);
  switch (err.type) {
    case errorType.validate:
      msg = err.message;
      errors = err.errors;
      status = httpStatus.BAD_REQUEST;
      break;
    case errorType.authentication:
      msg = err.message;
      status = httpStatus.UNAUTHORIZED;
      break;
    case errorType.notFound:
      msg = err.message;
      status = httpStatus.NOT_FOUND;
      break;
    case errorType.dataBase:
      msg = err.message;
      status = httpStatus.BAD_REQUEST;
      break;
    default:
      msg = 'server internal error';
      break;
  }

  res.status(status).json({ msg, errors });
};
