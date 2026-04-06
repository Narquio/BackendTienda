import { Injectable } from '@nestjs/common';
import {User, usersRepository } from './users.repository';

@Injectable()
export class UsersService {
 constructor(private readonly usersRepository:usersRepository) {}
  

  getAllUsers():Omit<User, `password`>[] {
    return this.usersRepository.getAllUsers();
  }
  getUserById(id:string){
  return this.usersRepository.getUserById(id);
  }

  addUser(newUser: any){
    return this.usersRepository.addUser(newUser);
  }
}
