import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user_send: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user_recive: UserEntity;
}
