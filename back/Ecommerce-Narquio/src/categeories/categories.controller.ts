import { Controller, Get } from '@nestjs/common';
import { CategeoriesService } from './categories.service';

@Controller('categories')
export class CategeoriesController {
  constructor(private readonly categeoriesService: CategeoriesService) {}

  @Get()
  async getCategories() {
    return await this.categeoriesService.getallCategories();
  }

  @Get('seeder')
  async addCategories() {
    return await this.categeoriesService.addCategories();
  }
}