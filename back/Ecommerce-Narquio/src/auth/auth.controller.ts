import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUsersDTO } from '../users/users.Dto/loginUsers.Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthStatus() {
    return this.authService.getAuthStatus();
  }
  @Post(`signIn`)
  signIn (@Body()credentials: loginUsersDTO) {
  const {email, password} = credentials;
  return this.authService.signIn(email, password);
  }
}
