import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "../products/products.entity";
import { Categories } from "../categeories/categories.entity"; 
import { allProducts } from "../utils/data";

@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  
  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: { category: true },
      skip: skip,
      take: limit,
    });
    return products;
  } 


  async addProducts(): Promise<string> {
  const categories = await this.ormCategoriesRepository.find();

  
    for (const element of allProducts) {
    const category = categories.find((cat) => cat.name === element.category);

      if (!category) throw new Error(`Categoría ${element.category} no encontrada`);

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;

      await this.ormProductsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    }
  ;
  
  return "Productos agregados exitosamente";
} 

async getProductById(id: string): Promise<Products| string> {
  const product = await this.ormProductsRepository.findOneBy({ id });   
  if (!product) {
    return `Producto con ID ${id} no encontrado`;
  }
  return product;

}


async updateProduct(id: string, productNewData: Partial<Products>): Promise<Products | null> {
  
  await this.ormProductsRepository.update(id, productNewData);
  const updatedProduct = await this.ormProductsRepository.findOneBy({ id });
  return updatedProduct;
}

async deleteProduct(id: string): Promise<Products | null> {
  const product = await this.ormProductsRepository.findOneBy({ id });
  if (!product) return null;
  await this.ormProductsRepository.delete(id);
  return product;
}
} 