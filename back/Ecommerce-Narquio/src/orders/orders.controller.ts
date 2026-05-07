import { Controller, Body, Param, Post, Get, UseGuards  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import{ CreateOrdersDTO } from './orders.DTO/createOrders.DTO';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

@Get(`:id`)
getOrderById(@Param('id') id: string) {
  return this.ordersService.getorderById(id);
}
@Post()
@UseGuards(AuthGuard)
addOrder(@Body() newOrderData:CreateOrdersDTO) {
  return this.ordersService.addOrder(newOrderData);

}
}

