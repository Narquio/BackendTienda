import { Controller, Get, Post, Param, Body, Put, Delete, Query, UseGuards,  } from '@nestjs/common';
import { User } from './users.repository';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(@Query(`page`) page?: string,@Query(`limit`) limit?: string):Omit<User, `password`>[] {
    const pageNum=Number(page);
    const limitNum= Number(limit);

    const validPage= !isNaN(pageNum)  && pageNum>0 ? pageNum : 1;
    const validLimit= !isNaN(limitNum)  && limitNum>0 ? limitNum : 5;
    return this.usersService.getAllUsers(validPage, validLimit);
  }

@Get(`:id`)
@UseGuards(AuthGuard)
 getUserById(@Param(`id`) id:string) {
  return this.usersService.getUserById(id);
 }

@Post() 
addUser(@Body()newUser: any) {
  return this.usersService.addUser(newUser);
}

@Put(`:id`) 
updateUser(@Param(`id`) id:string, @Body()userNewData: any ) {
  return this.usersService.updateUser(id, userNewData)
}

@Delete(`:id`)
@UseGuards(AuthGuard)
deleteUser (@Param(`id`) id:string) {
  return this.usersService.deleteUser(id);
}
}