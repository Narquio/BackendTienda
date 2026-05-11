import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Users } from '../users/users.entity';
import { OrderDetail } from './ordersDetail.entity';

@Entity({ name: 'orders' })
export class Orders {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único de la orden' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiHideProperty()
  @ManyToOne(() => Users, (user) => user.orders)
  user!: Users;

  @ApiProperty({ example: '2024-01-15', description: 'Fecha de la orden' })
  @Column({ type: 'date', nullable: true })
  date!: Date;

  @ApiHideProperty()
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
 orderDetail!: OrderDetail;
}