import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../config/environment';
import{AuthModule} from '../auth/auth.module'

@Module({
  imports: [JwtModule.register({secret:environment.JWT_SECRET,
    signOptions:{expiresIn: `1h`}
  })    ,TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
