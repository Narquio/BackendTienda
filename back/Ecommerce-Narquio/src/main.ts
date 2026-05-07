import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('proyecto integrador M4 back')
    .setDescription('Aplicacion creada con nestJS')
    .setVersion('1.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT);
  console.log(`El servidor esta escuchando en http://${HOST}:${PORT}`);
}

bootstrap();