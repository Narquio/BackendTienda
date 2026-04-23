import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from '../orders/ordersDetail.entity';



@Injectable()
export class usersRepository {
  constructor(
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number): Promise<Omit<Users, `password`>[] | string> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      skip: skip,
      take: limit,
    });

    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }


    

async getUserById(id:string):Promise<Omit<Users, `password`> | string> {
  const foundUser= await this.ormUsersRepository.findOne({
  where:{id},
  relations:
  {orders: 
    {OrderDetail: 
      {products: 
        true,}
      }
    }
  }
);

  if(!foundUser) return  `Usuario ${id} no encontrado`;
  const{ password, ...userNoPassword} = foundUser;
  return userNoPassword
}


async getUserByEmail(email: string): Promise<Users | null> {
  return await this.ormUsersRepository.findOneBy({ email });
}

async addUser(newUserData: any): Promise<string> {
  const savedUser = await this.ormUsersRepository.save(newUserData);
  return savedUser.id;
}

async updateUser(id: string,
  newUserData: Users): Promise<Omit<Users, `password`> | string> {
    const user= await this.ormUsersRepository.findOneBy({ id });
    if(!user) return  `Usuario ${id} no encontrado`;
    const mergedUser = this.ormUsersRepository.merge(user, newUserData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);
    const { password, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

   async deleteUser(id: string) {
   const foundUser = await this.ormUsersRepository.findOneBy({ id });
   if (!foundUser) throw new Error(`Usuario ${id} no encontrado`);
   this.ormUsersRepository.remove(foundUser);
   return foundUser.id;
  }

  }
