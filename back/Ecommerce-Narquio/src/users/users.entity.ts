import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  
} from 'typeorm';
import { Orders } from '../orders/orders.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country!: string;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders!: Orders[];
}