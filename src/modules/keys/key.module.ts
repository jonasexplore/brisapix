import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { KeyController } from './key.controller';
import { KeyEntity } from './key.entity';
import { KeyService } from './key.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeyEntity, UserEntity])],
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}
