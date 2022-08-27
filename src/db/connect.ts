import { AppDataSource } from './ormconfig';

export const connectDB = async (): Promise<void> => {
  await AppDataSource.initialize();
  console.log('db Connected');
};
