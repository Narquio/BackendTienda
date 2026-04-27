import { Injectable,  NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsService } from '../products/products.service';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRepository,
       private readonly productsService: ProductsService,
    ) {}
    async uploadImage(productId: string, file: Express.Multer.File) {
    const product = await this.productsService.getProductById(productId);
    if (!product) throw new NotFoundException(`Producto con id ${productId} no encontrado`);

    const result = await this.fileUploadRepository.uploadImage(file);
if (!result.secure_url) throw new Error('Error al subir la imagen a Cloudinary');


 await this.productsService.updateProduct(productId, { imgUrl: result.secure_url });

 const updatedProduct = await this.productsService.getProductById(productId);

    return updatedProduct;
  }
}
