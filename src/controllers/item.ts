import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { CodeSchema, IdSchema } from '../schemas/idSchema';
import * as itemService from '../services/item';
import { validator } from '../utils/validate';
import { ItemSchema, UpdateItemSchema } from '../schemas/itemSchema';
import InvoiceError from '../utils/invoiceError';

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(ItemSchema, body);
    await itemService.createItem(body);
    res.status(httpStatus.CREATED).send('items Created');
  } catch (error) {
    next(error);
  }
};

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await itemService.getItems();
    res.status(httpStatus.OK).send(items);
  } catch (error) {
    next(error);
  }
};

export const getItemsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const itemss = await itemService.getItemById(id);
    res.status(httpStatus.OK).send(itemss);
  } catch (error) {
    next(error);
  }
};

export const getItemByCodeOrBarCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      query,
    } = req;
    await validator(CodeSchema, query);
    if(!query) {
      throw new InvoiceError('code', 'bad code');
    }
    const code = query.code ? query.code.toString() : '';
    const item = await itemService.getItemByCodeOrBarCode(code);
    res.status(httpStatus.OK).send(item);
  } catch (error) {
    next(error);
  }
};

export const updateItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(UpdateItemSchema, body);
    delete body['updatedBy'];
    await itemService.updateItemById(params.id, body);

    res.status(httpStatus.OK).send('items Updated');
  } catch (error) {
    next(error);
  }
};
