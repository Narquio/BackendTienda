import { Controller, Put, Param, UseInterceptors, UploadedFile, MaxFileSizeValidator,FileTypeValidator, ParseFilePipe } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Put('UploadImage/:id')
  @UseInterceptors (FileInterceptor(`file`))
  async uploadImage(
    @Param(`id`) productId: string,
  @UploadedFile(new ParseFilePipe({
    validators:[new MaxFileSizeValidator({ maxSize:200000,
      message: 'El tamaño del archivo excede el límite permitido de 200KB'
     }), new FileTypeValidator({ fileType: /.(jpg|jpeg|png)/,
     })]

  })) file: Express.Multer.File){
    console.log(file);
    return this.fileUploadService.uploadImage(productId, file);
  }
  
}
