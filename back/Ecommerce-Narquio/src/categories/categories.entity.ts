import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../products/products.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}