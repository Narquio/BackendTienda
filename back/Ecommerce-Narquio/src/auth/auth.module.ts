import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // ← cambiá JwtService por JwtModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({         
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  exports: [JwtModule],
})
export class AuthModule {}
