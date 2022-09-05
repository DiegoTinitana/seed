import { CategoryEntity } from '../db/entities/categoryEntity';
import { ItemEntity } from '../db/entities/itemEntity';
import { AppDataSource } from '../db/ormconfig';
import { NewCategoryI } from '../interfaces/category';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const createCategory = async (
  Categories: NewCategoryI[],
  categoryId?: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(CategoryEntity);
    const newCategories = await query
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values(Categories)
      .execute();

    if (categoryId) {
      await query
        .createQueryBuilder()
        .relation(ItemEntity, 'categories')
        .of(categoryId)
        .add(newCategories.identifiers);
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const updateCategoryById = async (
  id: string,
  category: NewCategoryI
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(CategoryEntity);
    const CategoryUpdated = await query
      .createQueryBuilder()
      .update(CategoryEntity)
      .set(category)
      .where('id= :id', { id })
      .execute();
    if (CategoryUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'Category not found');
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const getCategories = async (): Promise<NewCategoryI[]> => {
  try {
    const query = AppDataSource.getRepository(CategoryEntity);
    return await query
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.items', 'items')
      .getMany();
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const getCategoryById = async (id: string): Promise<NewCategoryI | null> => {
  try {
    const query = AppDataSource.getRepository(CategoryEntity);
    return await query.createQueryBuilder().where('id= :id', { id }).getOne();
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const setCategoryToItems = async (categoryId: string, items: string[]): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(CategoryEntity);
    await query
    .createQueryBuilder()
    .relation(ItemEntity, 'categories')
    .of(categoryId)
    .add(items);
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

