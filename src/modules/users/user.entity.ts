import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KeyEntity } from '../keys/key.entity';
import { TransactionEntity } from '../transactions/transaction.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'username',
    description: 'Nome do usuário',
  })
  username: string;

  @Column()
  @ApiProperty({
    example: '88012345678',
    description: 'Número do telefone/celular',
  })
  phone_number: string;

  @OneToMany(() => KeyEntity, (key) => key.user)
  keys: KeyEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user_send)
  transactions_send: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user_recive)
  transactions_recive: TransactionEntity[];
}
