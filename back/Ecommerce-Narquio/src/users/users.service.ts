import { Injectable } from '@nestjs/common';
import {User, usersRepository } from './users.repository';

@Injectable()
export class UsersService {
 constructor(private readonly usersRepository:usersRepository) {}
  

  getAllUsers(validPage:number, validLimit: number):Omit<User, `password`>[] {
    return this.usersRepository.getAllUsers(validPage,validLimit);
  }
  getUserById(id:string){
  return this.usersRepository.getUserById(id);
  }

  addUser(newUser: any){
    return this.usersRepository.addUser(newUser);
  }
  updateUser(id: string, userNewData: any){
    return this.usersRepository.updateUser(id, userNewData)
  }

  deleteUser (id: string){
    return this.usersRepository.deleteUser(id);
  }

}
