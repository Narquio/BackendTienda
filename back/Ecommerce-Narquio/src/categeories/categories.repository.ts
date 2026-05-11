import { allProducts } from "../utils/data";
import { Categories } from "./categories.entity";
import { Injectable } from "@nestjs/common"; 
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}  

  async getallCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find({ relations: ['products'] });
  }

    async addCategories(): Promise<string> {
        const insertPromises = allProducts.map((element) =>
             this.ormCategoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({ name: element.category })
                .orIgnore()
                .execute()
        );
             await Promise.all(insertPromises); 

        return 'Categorias agregadas exitosamente';
    }
}
