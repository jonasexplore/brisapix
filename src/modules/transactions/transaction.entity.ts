import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '1',
    description: 'Identificador único da transação',
  })
  id: number;

  @Column('float')
  @ApiProperty({
    example: 10.0,
    description: 'Valor da transação',
  })
  value: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions_send, {
    eager: true,
  })
  @JoinColumn()
  user_send: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactions_recive, {
    eager: true,
  })
  @JoinColumn()
  user_recive: UserEntity;
}
