import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { User } from './users.repository';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  
  getAllUsers():Omit<User, `password`>[] {
    return this.usersService.getAllUsers();
  }

@Get(`:id`)
 getUserById(@Param(`id`) id:string) {
  return this.usersService.getUserById(id);
 }

@Post() 
addUser(@Body()newUser: any) {
  return this.usersService.addUser(newUser);
}

@Put(`:id`) 
updateUser(@Param(`id`) id:string, @Body()newUser: any ) {}

@Delete(`:id`)
deleteUser (@Param(`id`) id:string) {}
}