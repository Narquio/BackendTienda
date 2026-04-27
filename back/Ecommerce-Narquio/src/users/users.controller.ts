import { Controller, Get, Post, Param, Body, Put, Delete, Query, UseGuards,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import {UpdateUserDto } from './users.Dto/updateUsers.Dto.ts';
import { CreateUserDto } from './users.Dto/createUsers.Dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(@Query(`page`) page?: string,@Query(`limit`) limit?: string):Promise<Omit<any, `password`>[] | string> {
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
addUser(@Body() newUser: CreateUserDto) {
  return this.usersService.addUser(newUser);
}

@Put(`:id`) 
updateUser(@Param(`id`) id:string, @Body()userNewData: UpdateUserDto ) {
  return this.usersService.updateUser(id, userNewData)
}

@Delete(`:id`)
@UseGuards(AuthGuard)
deleteUser (@Param(`id`) id:string) {
  return this.usersService.deleteUser(id);
}
}