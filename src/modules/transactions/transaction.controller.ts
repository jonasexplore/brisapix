import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequest, NotAccept } from 'src/errors/NotAccept';
import { UserNotFound } from '../users/dtos/user';
import {
  ListTransactionResponse,
  Transaction,
  UserSameNotAccept,
  ValueNotAccept,
} from './dtos/Transaction';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@ApiTags('Transações')
@Controller('/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/:userId')
  @ApiOperation({
    summary: 'Retornar todas as transações relacionadas ao ID do usuário.',
  })
  @ApiResponse({
    status: 200,
    type: ListTransactionResponse,
    isArray: true,
    description:
      'A api retorna o status 200 informado todas as transações relacionadas ao usuário.',
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
  public async getAllTransactionsByUserId(
    @Param('userId') userId: number,
  ): Promise<ListTransactionResponse[]> {
    const transactions = await this.transactionService.getTransactionsByUser(
      userId,
    );

    return transactions;
  }

  @Post('/')
  @ApiOperation({ summary: 'Criar uma nova transação.' })
  @ApiResponse({
    status: 201,
    description: 'A api retorna os dados da transação criada.',
    type: TransactionEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'A api retorna o valor da transação é inválido.',
    type: ValueNotAccept,
  })
  @ApiResponse({
    status: 404,
    description:
      'A api retorna que um dos usuários informado não foi encontrado.',
    type: UserNotFound,
  })
  @ApiResponse({
    status: 406,
    description: 'A api retorna que os usuários informados não a mesma pessoa.',
    type: UserSameNotAccept,
  })
  @ApiBody({
    type: Transaction,
    description: 'Dados para o cadastro da transação',
  })
  public async createNewTransaction(
    @Body() transaction: Transaction,
  ): Promise<TransactionEntity> {
    const createdTransaction = await this.transactionService.create(
      transaction,
    );

    return createdTransaction;
  }
}
