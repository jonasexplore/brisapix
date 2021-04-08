import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequest, NotAccept } from 'src/errors/NotAccept';
import { NotFound } from 'src/errors/NotFound';

import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ListTransactionResponse, Transaction } from './dtos/Transaction';
import { TransactionEntity } from './transaction.entity';

export enum TransactionType {
  RECIVE = 'recive',
  SEND = 'send',
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getTransactionsByUser(
    userId: number,
  ): Promise<ListTransactionResponse[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFound('USER');
    }

    const transactions = await this.transactionRepository.find({
      where: [{ user_recive: user }, { user_send: user }],
    });

    let formatedTransactions: ListTransactionResponse[] = [];
    transactions.map((transaction) =>
      transaction.user_send.id == userId
        ? formatedTransactions.push({
            ...transaction,
            type: TransactionType.SEND,
          })
        : formatedTransactions.push({
            ...transaction,
            type: TransactionType.RECIVE,
          }),
    );

    return formatedTransactions;
  }

  public async create(
    transactionData: Transaction,
  ): Promise<TransactionEntity> {
    if (transactionData.value <= 0) {
      throw new BadRequest('VALUE_NOT_ALLOW');
    }

    if (transactionData.userSendId === transactionData.userReciveId) {
      throw new NotAccept('SEND_RECIVE_USER_ARE_THE_SAME');
    }

    const userSend = await this.userRepository.findOne({
      where: { id: transactionData.userSendId },
    });

    if (!userSend) {
      throw new NotFound('USER_SEND');
    }

    const userRecive = await this.userRepository.findOne({
      where: { id: transactionData.userReciveId },
    });

    if (!userRecive) {
      throw new NotFound('USER_RECIVE');
    }

    const createdTransaction = await this.transactionRepository.create({
      user_send: userSend,
      user_recive: userRecive,
      value: transactionData.value,
    });

    await this.transactionRepository.save(createdTransaction);

    return createdTransaction;
  }
}
