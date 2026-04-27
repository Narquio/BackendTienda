import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDTO } from './orders.DTO/createOrders.DTO';

@Injectable()
export class OrdersService {constructor(private  ordersRepository: OrdersRepository) {}

getorderById(id: string)
{return this.ordersRepository.getOrderById(id);
}

addOrder(newOrderData: CreateOrdersDTO) {
    return this.ordersRepository.addOrder(newOrderData);
}
}