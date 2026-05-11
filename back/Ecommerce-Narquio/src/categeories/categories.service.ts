import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async getallCategories() {
        return await this.categoriesRepository.getallCategories();

    }   
    async addCategories() {
        return await this.categoriesRepository.addCategories();
    }
}
