import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotFound } from '../users/dtos/user';
import { DuplicatedKey, Key, LimitReached } from './dtos/Key';
import { KeyEntity } from './key.entity';
import { KeyService } from './key.service';

@ApiTags('Chaves')
@Controller('/keys')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Get('/:userId')
  @ApiOperation({
    summary:
      'Buscar todas as chaves PIX cadastradas pelo ID do usuário informado.',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'Array com as chaves PIX cadastradas.',
    type: KeyEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'A api retorna que o usuário não foi encontrado pelo ID informado.',
    type: UserNotFound,
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'Identificador único do usuário',
    example: 1,
  })
  public async getAllKeysByUserId(
    @Param('userId') userId: number,
  ): Promise<KeyEntity[]> {
    const keys = await this.keyService.getKeysByUser(userId);
    return keys[0];
  }

  @Post('/')
  @ApiOperation({ summary: 'Cadastrar um nova chave PIX.' })
  @ApiResponse({
    status: 201,
    description: 'A api retorna os dados da chave PIX cadastrada.',
    type: KeyEntity,
  })
  @ApiResponse({
    status: 404,
    description:
      'A api retorna que o usuário não foi encontrado pelo ID informado.',
    type: UserNotFound,
  })
  @ApiResponse({
    status: 400,
    description:
      'A api retorna que o limite máximo de chaves cadastradas foi atingido.',
    type: LimitReached,
  })
  @ApiResponse({
    status: 406,
    description: 'A api retorna que a chave PIX já encontra-se cadastrada.',
    type: DuplicatedKey,
  })
  @ApiBody({
    type: Key,
    description: 'Dados para o cadastro da chave',
  })
  public async addNewKey(@Body() keyData: Key): Promise<KeyEntity> {
    const addedKey = await this.keyService.add(keyData);

    return addedKey;
  }

  @Delete('/:keyId')
  @ApiOperation({ summary: 'Excluí uma chave PIX específica pelo ID.' })
  @ApiResponse({
    status: 200,
    type: KeyEntity,
    description:
      'A api retorna o status 200 e as informações da chave removida caso ela exista.',
  })
  @ApiParam({
    name: 'keyId',
    type: Number,
    description: 'Identificador único da chave PIX',
    example: 1,
  })
  public async removeKey(@Param('keyId') keyId: number): Promise<KeyEntity> {
    const deletedKey = await this.keyService.removeKey(keyId);

    return deletedKey;
  }
}
