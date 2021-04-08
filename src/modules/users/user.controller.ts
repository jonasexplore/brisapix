import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotFound, User, UserNameNotAccept } from './dtos/user';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Usuários')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Buscar todos os usuários cadastrados.' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: 'A api retorna todos os usuários cadastrados.',
    type: UserEntity,
  })
  public async getAll(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();

    return users;
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Buscar usuário específico pelo ID.' })
  @ApiResponse({
    status: 200,
    description: 'A api retorna os dados do usuário encontrado.',
    type: UserEntity,
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
  public async getById(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.getById(userId);

    return user;
  }

  @Post('/')
  @ApiOperation({ summary: 'Cadastrar um novo usuário.' })
  @ApiResponse({
    status: 201,
    description: 'A api retorna os dados do usuário cadastrado.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 406,
    description: 'A api retorna que o nome do usuário já está sendo usado.',
    type: UserNameNotAccept,
  })
  @ApiBody({
    type: User,
    description: 'Dados para o cadastro do usuário',
  })
  public async create(@Body() userData: User): Promise<UserEntity> {
    const createdUser = await this.userService.create(userData);

    return createdUser;
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'Excluí usuário específico pelo ID.' })
  @ApiResponse({
    status: 200,
    description:
      'A api retorna o status 200 informado que concluiu a requisição.',
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
  public async remove(@Param('userId') userId: number): Promise<UserEntity> {
    const deletedUser = await this.userService.remove(userId);

    return deletedUser;
  }
}
