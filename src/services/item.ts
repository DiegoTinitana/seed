import { CategoryEntity } from '../db/entities/categoryEntity';
import { ItemEntity } from '../db/entities/itemEntity';
import { AppDataSource } from '../db/ormconfig';
import { NewItemsI } from '../interfaces/items';
import { errorType } from '../utils/erroTypes';
import InvoiceError from '../utils/invoiceError';

export const createItem = async (
  items: NewItemsI[],
  categoryId?: string
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    const newItems = await query
      .createQueryBuilder()
      .insert()
      .into(ItemEntity)
      .values(items)
      .execute();

    if (categoryId) {
      await query
        .createQueryBuilder()
        .relation(CategoryEntity, 'items')
        .of(categoryId)
        .add(newItems.identifiers);
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const updateItemById = async (
  id: string,
  item: NewItemsI
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    const itemUpdated = await query
      .createQueryBuilder()
      .update(ItemEntity)
      .set(item)
      .where('id= :id', { id })
      .execute();
    if (itemUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'item not found');
    }
    console.log(`item_service: updateItemById,  itemUpdated with id: ${id}`);
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const getItemByCodeOrBarCode = async (
  code: string
): Promise<NewItemsI | null> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    const item = await query
      .createQueryBuilder()
      .where('code= :code', { code })
      .orWhere('"barCode"= :code', { code })
      .getOne();

    return item;
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const getItems = async (): Promise<NewItemsI[]> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    return await query
      .createQueryBuilder('items')
      .leftJoinAndSelect('items.categories', 'categories')
      .getMany();
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const getItemById = async (id: string): Promise<NewItemsI | null> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    return await query.createQueryBuilder().where('id= :id', { id }).getOne();
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const deactiveItemById = async (
  id: string,
): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    const itemUpdated = await query
      .createQueryBuilder()
      .update()
      .set({ isActive: false })
      .where('id= :id', { id })
      .execute();
    if (itemUpdated.affected === 0) {
      throw new InvoiceError(errorType.notFound, 'item not found');
    }
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

export const setItemToCategories = async (itemId: string, categories: string[]): Promise<void> => {
  try {
    const query = AppDataSource.getRepository(ItemEntity);
    await query
    .createQueryBuilder()
    .relation(CategoryEntity, 'items')
    .of(itemId)
    .add(categories);
  } catch (error) {
    throw new InvoiceError(errorType.dataBase, '', error);
  }
};

