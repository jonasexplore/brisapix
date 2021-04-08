import { ApiProperty } from '@nestjs/swagger';

export abstract class Key {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Valor da chave PIX',
  })
  value: string;
  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário',
  })
  userId: number;
}

export abstract class DuplicatedKey {
  @ApiProperty({
    example: 406,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'DUPLICATED_KEY',
    description: 'Descrição do status',
  })
  message: string;
}

export abstract class LimitReached {
  @ApiProperty({
    example: 400,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'MAX_LIMIT_REACHED',
    description: 'Descrição do status',
  })
  message: string;
}
