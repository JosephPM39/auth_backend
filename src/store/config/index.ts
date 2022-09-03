import { BaseEntity, DataSource, EntitySchema, EntityTarget, MixedList } from 'typeorm';

export const config = {
  env: process.env.NODE_ENV,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER ?? '',
  dbPass: process.env.DB_PASS ?? '',
  dbPort: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined,
  dbHost: process.env.DB_HOST,
};

export type EntitiesADS = MixedList<string | Function | EntitySchema<any>>;

export const AppDataSource = (EntitiesORM?: EntitiesADS) => new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: EntitiesORM,
  synchronize: true,
  logging: config.env === 'dev',
});
