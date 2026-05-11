import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Orders } from '../orders/orders.entity';

@Entity({ name: 'users' })
export class Users {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único del usuario' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @ApiProperty({ example: 'juan@email.com', description: 'Correo electrónico único' })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email!: string;

  @ApiHideProperty() 
  @Column({ type: 'varchar', length: 60, nullable: false })
  password!: string;

  @ApiProperty({ example: '1234567890', description: 'Número de teléfono', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @ApiProperty({ example: 'Argentina', description: 'País del usuario', required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  country!: string;

  @ApiProperty({ example: 'Av. Siempreviva 742', description: 'Dirección del usuario', required: false })
  @Column({ type: 'text', nullable: true })
  address!: string;

  @ApiProperty({ example: 'Buenos Aires', description: 'Ciudad del usuario', required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  city!: string;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  @Column({ default: true })
  isActive!: boolean;

  @ApiHideProperty()
  @Column({ default: false })
  isAdmin!: boolean;

  @ApiHideProperty()
  @OneToMany(() => Orders, (orders) => orders.user)
  orders!: Orders[];
}