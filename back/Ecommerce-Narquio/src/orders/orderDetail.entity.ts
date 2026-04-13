import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Products } from '../products/products.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  products: Products[];
}