import { Module } from '@nestjs/common';
import { KeyModule } from '../keys/key.module';
import { UserModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [UserModule, KeyModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
