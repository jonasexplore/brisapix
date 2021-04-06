import { Module } from '@nestjs/common';
import { KeyController } from './key.controller';

@Module({
  imports: [],
  controllers: [KeyController],
  providers: [],
})
export class KeyModule {}
