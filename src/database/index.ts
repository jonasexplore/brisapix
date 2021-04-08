import 'dotenv/config';

import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  database: process.env.DB_BASE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
