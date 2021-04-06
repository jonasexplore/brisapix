import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  database: '',
  host: 'localhost',
  port: 5432,
  password: '',
  username: 'postgres',
};

export = config;
