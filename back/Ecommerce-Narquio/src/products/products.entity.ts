import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../categeories/categories.entity';
import { OrderDetail } from '../orders/ordersDetail.entity';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @Column({ type: 'int', nullable: false })
  stock!: number;

  @Column({
    type: 'varchar',
    default: 'https://via.placeholder.com/150',
  })
  imgUrl!: string;

  @ManyToOne(() => Categories, (category) => category.products)
  category!: Categories;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails!: OrderDetail[];
}