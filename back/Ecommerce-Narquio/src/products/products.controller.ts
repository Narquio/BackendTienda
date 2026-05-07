import { Body,Controller, Get, Delete, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../customDecorators/role.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query('page') page: string, @Query('limit') limit:string) {
   if (page && limit) return this.productsService.getAllProducts(Number(page), Number(limit));
    
   return this.productsService.getAllProducts(1, 5);
    }

    @Get(`seeder`)
    addProducts() {
      return this.productsService.addProducts();
    }

    @Get(`:id`)
    getProductById(@Param('id') id: string) {
      return this.productsService.getProductById(id);
    }
    
    @Put(`:id`)
    @Role(`admin`)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id') id: string, @Body() productNewData: Products) {
      return this.productsService.updateProduct(id, productNewData);
    }

    @Delete(`:id`)
    deleteProduct(@Param('id') id: string) {
      return this.productsService.deleteProduct(id);
    }
}
