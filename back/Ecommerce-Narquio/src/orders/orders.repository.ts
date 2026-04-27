import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDetail } from "./ordersDetail.entity";
import { Orders}from "./orders.entity";
import { Users } from "../users/users.entity";
import { Products } from "../products/products.entity";
import { CreateOrdersDTO } from "./orders.DTO/createOrders.DTO";


@Injectable()
export class OrdersRepository  {constructor
    (
        @InjectRepository(Orders)
    private ormOrdersRepository: Repository<Orders>,
    
    @InjectRepository(OrderDetail)
    private ormOrderDetailRepository: Repository<OrderDetail>,

    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,

    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,

    
    )
{}

    async getOrderById(id: string): Promise<Orders | string> {
        const order = await this.ormOrdersRepository.findOne({
            where: { id },
            relations: { orderDetail:{ products:true,

            },
        },
        });
        if (!order) {return   `Orden con id ${id} no encontrada`; 
        }
    return order;

}

async addOrder(newOrderData:CreateOrdersDTO): Promise<Orders[] | string> {
  const { userId, products } = newOrderData;

  const user = await this.ormUsersRepository.findOneBy({ id: userId });
  if (!user) return `Usuario con id ${userId} no encontrado`;

  const order = new Orders();
  order.date = new Date();
  order.user = user;
  const newOrder = await this.ormOrdersRepository.save(order);

  const productsArray = await Promise.all(
    products.map(async (element) => {
      const product = await this.ormProductsRepository.findOneBy({ id: element.id });

      if (!product) throw new Error(`Producto con id ${element.id} no encontrado`);

      await this.ormProductsRepository.update(
        { id: element.id },
        { stock: product.stock - 1 }
      );

      return product;
    })
  );

  const total = productsArray.reduce((sum, product) => sum + Number(product.price), 0);

  const orderDetail = new OrderDetail();
  orderDetail.price = total;
  orderDetail.order = newOrder;
  orderDetail.products = productsArray;
  await this.ormOrderDetailRepository.save(orderDetail);

 return await this.ormOrdersRepository.find({
  where: { id: newOrder.id },
  relations: { orderDetail: true },
});
}
}