import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/user.entity';
import { TransactionType } from '../transaction.service';

export abstract class Transaction {
  @ApiProperty({
    example: 10.0,
    description: 'Valor da transação',
  })
  value: number;
  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário que realizou a transação',
  })
  userSendId: number;
  @ApiProperty({
    example: '2',
    description: 'Identificador único do usuário que recebeu a transação',
  })
  userReciveId: number;
}

export abstract class ListTransactionResponse {
  @ApiProperty({
    example: '1',
    description: 'Identificador único da transação',
  })
  id: number;
  @ApiProperty({
    example: 10.0,
    description: 'Valor da transação',
  })
  value: number;
  @ApiProperty({
    type: UserEntity,
    description: 'Usuário que realizou a transação',
  })
  user_send: UserEntity;
  @ApiProperty({
    type: UserEntity,
    description: 'Usuário que recebeu a transação',
  })
  user_recive: UserEntity;
  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.RECIVE,
    description: 'Usuário que realizou a transação',
  })
  type: string;
}

export abstract class ValueNotAccept {
  @ApiProperty({
    example: 400,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'VALUE_NOT_ALLOW',
    description: 'Descrição do status',
  })
  message: string;
}

export abstract class UserSameNotAccept {
  @ApiProperty({
    example: 406,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'SEND_RECIVE_USER_ARE_THE_SAME',
    description: 'Descrição do status',
  })
  message: string;
}
