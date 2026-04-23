import { Injectable } from '@nestjs/common';
import { usersRepository } from './users.repository';

@Injectable()
export class UsersService {
 constructor(private readonly usersRepository:usersRepository) {}
  

  getAllUsers(validPage:number, validLimit: number):Promise<Omit<any, `password`>[] | string> {
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
