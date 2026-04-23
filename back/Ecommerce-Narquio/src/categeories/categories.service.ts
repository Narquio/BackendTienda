import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategeoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async getallCategories() {
        return await this.categoriesRepository.getallCategories();

    }   
    async addCategories() {
        return await this.categoriesRepository.addCategories();
    }
}
