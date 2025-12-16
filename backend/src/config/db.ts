import { DataSource } from 'typeorm';
import { Subscriber } from '../entities/Subscriber';
import { Alert } from '../entities/Alert';
import { AlertDelivery } from '../entities/AlertDelivery';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // only for dev, auto-creates tables
  logging: false,
  entities: [Subscriber, Alert, AlertDelivery],
  migrations: [],
  subscribers: [],
});
