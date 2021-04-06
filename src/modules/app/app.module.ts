import { Module } from '@nestjs/common';
import { KeyModule } from '../keys/key.module';
import { UserModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from '../transactions/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as configOrm from '../../database';

@Module({
  imports: [
    TypeOrmModule.forRoot(configOrm),
    UserModule,
    KeyModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
