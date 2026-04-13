import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { OrderDetail } from '../orders/orderDetail.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.orders)
  user: User;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetail;
}