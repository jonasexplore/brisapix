import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [],
})
export class TransactionModule {}
