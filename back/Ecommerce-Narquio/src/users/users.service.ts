import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './users.Dto/updateUsers.Dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
 constructor(private readonly usersRepository:UsersRepository) {}
  

  getAllUsers(validPage:number, validLimit: number):Promise<Omit<any, `password`>[] | string> {
    return this.usersRepository.getAllUsers(validPage,validLimit);
  }
  getUserById(id:string):Promise<Omit<Users, 'password'| `isAdmin`>>{
  return this.usersRepository.getUserById(id);
  }

  
  updateUser(id: string, userNewData: UpdateUserDto){
    return this.usersRepository.updateUser(id, userNewData)
  }

  deleteUser (id: string){
    return this.usersRepository.deleteUser(id);
  }

}
