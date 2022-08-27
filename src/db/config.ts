import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsRun: true,
  synchronize: false,
  logging: ['error']
};