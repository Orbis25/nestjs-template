import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

///Postgress configuration
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: Number(process.env.POSTGRES_PORT),
  migrationsRun: true,
  migrations: [__dirname + '../**/*.migration{.ts,.js}'],
};
