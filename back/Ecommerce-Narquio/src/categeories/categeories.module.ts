
import { Module } from '@nestjs/common';
import { CategeoriesService } from './categories.service';
import { CategeoriesController } from './categories.controller';
import { Categories } from './categories.entity';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]),AuthModule],
  controllers: [CategeoriesController],
  providers: [CategeoriesService, CategoriesRepository],
})
export class CategeoriesModule {}



