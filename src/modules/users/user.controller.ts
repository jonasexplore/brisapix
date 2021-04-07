import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './dtos/user';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getAll(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();

    return users;
  }

  @Get('/:userId')
  public async getById(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.getById(userId);

    return user;
  }

  @Post('/')
  public async create(@Body() userData: User): Promise<UserEntity> {
    const createdUser = await this.userService.create(userData);

    return createdUser;
  }

  @Delete('/:userId')
  public async remove(@Param('userId') userId: number): Promise<UserEntity> {
    const deletedUser = await this.userService.remove(userId);

    return deletedUser;
  }
}
