import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.NODE_ENV === 'development',
  entities: [__dirname + '/typeorm/entities/**/*.{ts,js}'],
  migrations: [__dirname + '/typeorm/migrations/**/*.{ts,js}'],
  subscribers: [],
});
