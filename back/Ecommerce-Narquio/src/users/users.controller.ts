import { Controller, Get,ParseUUIDPipe, Param, Body, Put, Delete, Query, UseGuards,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import {UpdateUserDto } from './users.Dto/updateUsers.Dto';
import { Role } from '../customDecorators/role.decorator';
import { Users } from './users.entity';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role(`admin`)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(@Query(`page`) page?: string,@Query(`limit`) limit?: string):Promise<Omit<any, `password`>[] | string> {
    const pageNum=Number(page);
    const limitNum= Number(limit);

    const validPage= !isNaN(pageNum)  && pageNum>0 ? pageNum : 1;
    const validLimit= !isNaN(limitNum)  && limitNum>0 ? limitNum : 5;
    return this.usersService.getAllUsers(validPage, validLimit);
  }

@Get(`:id`)
@Role(`admin`)
@UseGuards(AuthGuard, RolesGuard)
 getUserById(@Param(`id`,ParseUUIDPipe) id:string):Promise<Omit<Users, 'password'| `isAdmin`>> {
  return this.usersService.getUserById(id);
 }

//@Post() 
//addUser(@Body() newUser: CreateUserDto) {
 // return this.usersService.addUser(newUser);
//}

@Put(`:id`) 
@UseGuards(AuthGuard)
updateUser(@Param(`id`) id:string, @Body()userNewData: UpdateUserDto ) {
  return this.usersService.updateUser(id, userNewData)
}

@Delete(`:id`)
@UseGuards(AuthGuard)
deleteUser (@Param(`id`) id:string) {
  return this.usersService.deleteUser(id);
}
}