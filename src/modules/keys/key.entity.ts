import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('keys')
export class KeyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
