import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsModule } from '../products/products.module';
import { Products } from '../products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
