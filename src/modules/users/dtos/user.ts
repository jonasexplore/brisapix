import { ApiProperty } from '@nestjs/swagger';

export abstract class User {
  @ApiProperty({
    example: 'username',
    description: 'Nome do usuário',
  })
  username: string;
  @ApiProperty({
    example: '88912345678',
    description: 'Número do telefone/celular',
  })
  phone_number: string;
}

export abstract class UserNotFound {
  @ApiProperty({
    example: 404,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'USER_NOT_FOUND',
    description: 'Descrição do status',
  })
  message: string;
}

export abstract class UserNameNotAccept {
  @ApiProperty({
    example: 406,
    description: 'Status da requisição',
  })
  statusCode: number;
  @ApiProperty({
    example: 'USERNAME_ALREADY_USED',
    description: 'Descrição do status',
  })
  message: string;
}
