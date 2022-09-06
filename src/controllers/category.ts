import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { CategorySchema, SetCategorySchema, UpdateCategorySchema } from '../schemas/categorySchema';
import { IdSchema } from '../schemas/idSchema';

import * as CategoriesService from '../services/category';
import InvoiceError from '../utils/invoiceError';

import { validator } from '../utils/validate';

export const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    await validator(CategorySchema, body);
    await CategoriesService.createCategory(body);
    res.status(httpStatus.CREATED).send('Categories Created');
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Categoriess = await CategoriesService.getCategories();
    res.status(httpStatus.OK).send(Categoriess);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;
    const categoriess = await CategoriesService.getCategoryById(id);
    res.status(httpStatus.OK).send(categoriess);
  } catch (error) {
    next(error);
  }
};

export const updateCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    await validator(IdSchema, params);
    await validator(UpdateCategorySchema, body);
    await CategoriesService.updateCategoryById(params.id, body);
    res.status(httpStatus.NO_CONTENT).send('Category Updated');
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params
    } = req;
    await validator(IdSchema, params);
    await CategoriesService.deleteById(params.id);
    res.status(httpStatus.NO_CONTENT).send('CCategories deativated');
  } catch (error) {
    next(error);
  }
};

export const setCategoryToItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      query,
      body
    } = req;
    await validator(IdSchema, query);
    await validator(SetCategorySchema, body);
    if(!query) {
      throw new InvoiceError('code', 'bad code');
    }
    const id = query.id ? query.id.toString() : '';
    await CategoriesService.setCategoryToItems(id, body.items);
    res.status(httpStatus.NO_CONTENT).send('items was seted to category');
  } catch (error) {
    next(error);
  }
};

