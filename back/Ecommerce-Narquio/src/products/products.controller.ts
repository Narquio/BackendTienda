import { Body, Controller, Get, Delete, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../customDecorators/role.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UpdateProductDto } from './products.DTO/updateProduct.dto';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.productsService.getAllProducts(Number(page), Number(limit));
    return this.productsService.getAllProducts(1, 5);
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Cargar productos iniciales a la base de datos' })
  @ApiResponse({ status: 200, description: 'Productos cargados exitosamente' })
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar producto por ID (solo Admin)' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado — se requiere rol Admin' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  updateProduct(@Param('id') id: string, @Body() productNewData: UpdateProductDto) {
  return this.productsService.updateProduct(id, productNewData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}