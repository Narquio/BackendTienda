import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderDetail } from './ordersDetail.entity';
import { Users } from '../users/users.entity';
import { Products } from '../products/products.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Orders, OrderDetail, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
