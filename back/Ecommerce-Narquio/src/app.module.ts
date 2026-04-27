import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/typeorm';
import { CategeoriesModule } from './categeories/categeories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  })
  , UsersModule, AuthModule, ProductsModule, TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get(`typeOrm`)!,
    }), CategeoriesModule, OrdersModule, FileUploadModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
