
import { DataSource } from 'typeorm';
import { config } from './config';

export const AppDataSource = new DataSource({
  ...config,
  entities: [`${__dirname}/entities/**/*Entity{.ts,.js}`],
  migrations: [`${__dirname}/migration/**/*{.ts,.js}`],
});
