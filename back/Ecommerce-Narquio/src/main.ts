import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost ';
  await app.listen(process.env.PORT ?? 3000);
  console.log(`El servidor esta escuchando http://${HOST}:${PORT}`);
}
bootstrap();
