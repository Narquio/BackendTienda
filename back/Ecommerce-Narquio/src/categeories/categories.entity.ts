import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Products } from '../products/products.entity';

@Entity({ name: 'categories' })
export class Categories {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único de la categoría' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Electronics', description: 'Nombre de la categoría' })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @ApiHideProperty() 
  @OneToMany(() => Products, (products) => products.category)
  products!: Products[];
}