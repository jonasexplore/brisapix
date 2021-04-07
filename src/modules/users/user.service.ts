import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './dtos/user';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    return users;
  }

  public async getById(userId: number): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    return foundUser;
  }

  public async create(userData: User): Promise<UserEntity> {
    const createUser = await this.userRepository.create(userData);
    this.userRepository.save(createUser);

    return createUser;
  }

  public async remove(userId: number): Promise<UserEntity> {
    const deletedUser = await this.getById(userId);
    await this.userRepository.remove(deletedUser);

    return deletedUser;
  }
}
