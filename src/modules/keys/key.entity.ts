import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('keys')
export class KeyEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Identificador único da chave',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'example@email.com',
    description: 'Valor da chave PIX',
  })
  value: string;

  @ManyToOne(() => UserEntity, (user) => user.keys)
  @JoinColumn()
  user: UserEntity;
}
