import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('keys')
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
