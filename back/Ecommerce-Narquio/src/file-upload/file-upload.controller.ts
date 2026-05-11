import { Controller, UseGuards, Param, UseInterceptors, UploadedFile, MaxFileSizeValidator, FileTypeValidator, Post, ParseFilePipe } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('UploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir imagen de un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Imagen del producto (jpg, jpeg, png — máx 200KB)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Imagen subida exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido o demasiado grande' })
  @ApiResponse({ status: 401, description: 'No autorizado — se requiere token JWT' })
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 200000, message: 'El tamaño del archivo excede el límite permitido de 200KB' }),
        new FileTypeValidator({ fileType: /.(jpg|jpeg|png)/ }),
      ],
    })) file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(productId, file);
  }
}