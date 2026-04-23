import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { OrderDetail } from './ordersDetail.entity';

@Entity({ name: 'orders' })
export class Orders{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user!: Users;

  @Column({ type: 'date', nullable: true })
  date!: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail!: OrderDetail;
}