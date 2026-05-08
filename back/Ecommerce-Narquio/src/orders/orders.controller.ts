import { Controller, Body, Param, Post, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDTO } from './orders.DTO/createOrders.DTO';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden encontrada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getorderById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado — se requiere token JWT' })
  addOrder(@Body() newOrderData: CreateOrdersDTO) {
    return this.ordersService.addOrder(newOrderData);
  }
}