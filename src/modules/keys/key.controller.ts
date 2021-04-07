import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './dtos/Key';
import { KeyEntity } from './key.entity';
import { KeyService } from './key.service';

@Controller('/keys')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Get('/:userId')
  public async getAllKeysByUserId(
    @Param('userId') userId: number,
  ): Promise<KeyEntity[]> {
    const keys = await this.keyService.getKeysByUser(userId);
    return keys;
  }

  @Post('/')
  public async addNewKey(@Body() keyData: Key): Promise<KeyEntity> {
    const addedKey = await this.keyService.add(keyData);

    return addedKey;
  }

  @Delete('/:keyId')
  public async removeKey(@Param('keyId') keyId: number): Promise<KeyEntity> {
    const deletedKey = await this.keyService.removeKey(keyId);

    return deletedKey;
  }
}
