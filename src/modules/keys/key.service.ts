import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    const createdKey = await this.keyRepository.create({
      user: foundUser,
      value: keyData.value,
    });

    await this.keyRepository.save(createdKey);

    return createdKey;
  }

  public async getKeysByUser(userId: number): Promise<KeyEntity[]> {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new NotFound('USER');
    }

    const keys = await this.keyRepository.find({ where: { user: foundUser } });

    return keys;
  }

  public async removeKey(keyId: number): Promise<KeyEntity> {
    const foundKey = await this.keyRepository.findOne({ where: { id: keyId } });
    await this.keyRepository.remove(foundKey);

    return foundKey;
  }
}
