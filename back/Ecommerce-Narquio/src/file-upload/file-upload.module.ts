import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsModule } from '../products/products.module';
import { Products } from '../products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { v2 } from 'cloudinary';
import { environment } from '../config/environment';

@Module({
  imports: [ProductsModule, AuthModule, TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    FileUploadRepository,
    {
      provide: 'CLOUDINARY',
      useFactory: () => {
        return v2.config({
          cloud_name: environment.CLOUDINARY_CLOUD_NAME,
          api_key: environment.CLOUDINARY_API_KEY,
          api_secret: environment.CLOUDINARY_API_SECRET,
        });
      },
    },
  ],
})
export class FileUploadModule {}