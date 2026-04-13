import { Injectable } from '@nestjs/common';
import { usersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor (private readonly usersRepository:usersRepository){}
  getAuthStatus() {
    return {
      status: 'active',
      message: 'Auth service is running',
      timestamp: new Date().toISOString(),
    };
  }
  signIn (email:string, password: string){
    if (!email|| !password){ return `Email y contraseña son requeridos`;
 }
   const foundUser = this.usersRepository.getUserByEmail(email);
   if (!foundUser) return `Email o password incorrectos`;

   if (foundUser.password !== password) return `Email o password incorrectos`;

   return `Logging exitoso`;
  }
}
