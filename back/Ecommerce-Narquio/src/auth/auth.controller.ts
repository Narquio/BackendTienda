import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUsersDTO } from '../users/users.Dto/loginUsers.Dto';
import { CreateUserDto } from '../users/users.Dto/createUsers.Dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar estado del módulo Auth' })
  @ApiResponse({ status: 200, description: 'Módulo Auth activo' })
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signUp')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  signUp(@Body() newUserData: CreateUserDto) {
    return this.authService.signUp(newUserData);
  }

  @Post('signIn')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna token JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  signIn(@Body() credentials: loginUsersDTO) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}