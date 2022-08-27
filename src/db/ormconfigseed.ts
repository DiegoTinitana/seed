import { DataSource } from 'typeorm';
import { config } from './config';

export const AppDataSource = new DataSource({
  ...config,
  migrations: [`${__dirname}/seed/**/*{.ts,.js}`],
});
