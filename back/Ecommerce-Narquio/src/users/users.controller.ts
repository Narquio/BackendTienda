import { Controller, Get, ParseUUIDPipe, Param, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './users.Dto/updateUsers.Dto';
import { Role } from '../customDecorators/role.decorator';
import { Users } from './users.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo Admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 403, description: 'Acceso denegado — se requiere rol Admin' })
  getAllUsers(@Query('page') page?: string, @Query('limit') limit?: string): Promise<Omit<any, 'password'>[] | string> {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.usersService.getAllUsers(validPage, validLimit);
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener usuario por ID (solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado — se requiere rol Admin' })
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  updateUser(@Param('id') id: string, @Body() userNewData: UpdateUserDto) {
    return this.usersService.updateUser(id, userNewData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}