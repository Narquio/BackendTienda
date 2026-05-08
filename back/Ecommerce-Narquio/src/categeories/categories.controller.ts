import { Controller, Get } from '@nestjs/common';
import { CategeoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategeoriesController {
  constructor(private readonly categeoriesService: CategeoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías' })
  async getCategories() {
    return await this.categeoriesService.getallCategories();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Cargar categorías iniciales a la base de datos' })
  @ApiResponse({ status: 200, description: 'Categorías cargadas exitosamente' })
  async addCategories() {
    return await this.categeoriesService.addCategories();
  }
}