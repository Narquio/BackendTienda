import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/users.Dto/createUsers.Dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor (private readonly usersRepository:UsersRepository,
    private readonly jwtService: JwtService
  ){}
  getAuth() {
    return {
      status: 'active',
      message: 'Auth service is running',
      timestamp: new Date().toISOString(),
    };
  }
  async signUp (newUserData:CreateUserDto){
    const {email, password} = newUserData;{
    if (!email || !password) return `Email y contraseña son requeridos`}

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser){ throw new BadRequestException(`El email ya está registrado`);
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersRepository.addUser({ ...newUserData, password: hashedPassword });
    return `Usuario registrado exitosamente`;
    
    }


  async signIn (email:string, password: string){

  const foundUser = await this.usersRepository.getUserByEmail(email);
   if (!foundUser) { throw new BadRequestException(`Email o contraseña incorrectos`);
   }
   
   const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword){ throw new BadRequestException(`Email o contraseña incorrectos`);}


    const payload = { Id: foundUser.id,
       email: foundUser.email,
      roles: foundUser.isAdmin ? `admin`: `user`, };

    const token = this.jwtService.sign(payload);
    
   return {token: token, message: `Inicio de sesión exitoso`};


  }

}
