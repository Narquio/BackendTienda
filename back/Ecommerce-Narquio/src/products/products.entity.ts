import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Categories } from '../categeories/categories.entity';
import { OrderDetail } from '../orders/ordersDetail.entity';

@Entity({ name: 'products' })
export class Products {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único del producto' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Laptop HP', description: 'Nombre del producto (máx 50 caracteres)' })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @ApiProperty({ example: 'Laptop HP con procesador Intel Core i7', description: 'Descripción del producto' })
  @Column({ type: 'text', nullable: false })
  description!: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @ApiProperty({ example: 50, description: 'Cantidad disponible en stock' })
  @Column({ type: 'int', nullable: false })
  stock!: number;

  @ApiProperty({ example: 'https://via.placeholder.com/150', description: 'URL de la imagen del producto' })
  @Column({ type: 'varchar', default: 'https://via.placeholder.com/150' })
  imgUrl!: string;

  @ApiProperty({ type: () => Categories, description: 'Categoría del producto' })
  @ManyToOne(() => Categories, (category) => category.products)
  category!: Categories;

  @ApiHideProperty()
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails!: OrderDetail[];
}