import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUsersDTO } from '../users/users.Dto/loginUsers.Dto';
import { CreateUserDto } from '../users/users.Dto/createUsers.Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(){ 
    return this.authService.getAuth();
  }

  @Post(`signUp`)
  signUp (@Body() newUserData: CreateUserDto) {
    return this.authService.signUp(newUserData);
  }
  @Post(`signIn`)
  signIn (@Body()credentials: loginUsersDTO) {
  const {email, password} = credentials;
  return this.authService.signIn(email, password);
  }
}
