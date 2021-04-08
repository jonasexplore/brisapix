import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequest, NotAccept } from 'src/errors/NotAccept';
import { NotFound } from 'src/errors/NotFound';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { Key } from './dtos/Key';
import { KeyEntity } from './key.entity';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(KeyEntity)
    private readonly keyRepository: Repository<KeyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async add(keyData: Key): Promise<KeyEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { id: keyData.userId },
    });

    if (!foundUser) {
      throw new NotFound('USER');
    }

    const keys = await this.getKeysByUser(keyData.userId);

    const isDuplicateKey = keys[0].find((item) => item.value == keyData.value);
    const amountKeys = keys[1];

    if (isDuplicateKey) {
      throw new NotAccept('DUPLICATED_KEY');
    }

    if (amountKeys >= 3) {
      throw new BadRequest('MAX_LIMIT_REACHED');
    }

    const createdKey = await this.keyRepository.create({
      user: foundUser,
      value: keyData.value,
    });

    await this.keyRepository.save(createdKey);

    return createdKey;
  }

  public async getKeysByUser(userId: number): Promise<[KeyEntity[], number]> {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new NotFound('USER');
    }

    const key = await this.keyRepository.findAndCount({
      where: { user: foundUser },
    });

    return key;
  }

  public async removeKey(keyId: number): Promise<KeyEntity> {
    const foundKey = await this.keyRepository.findOne({ where: { id: keyId } });
    await this.keyRepository.remove(foundKey);

    return foundKey;
  }
}
