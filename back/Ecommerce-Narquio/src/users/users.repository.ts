import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.Dto/createUsers.Dto';
import { UpdateUserDto } from './users.Dto/updateUsers.Dto';

@Injectable()
export class usersRepository {
  constructor(
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      where: { isActive: true }, // ← solo usuarios activos
      skip,
      take: limit,
    });

    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id, isActive: true }, // ← verifica isActive
      relations: {
        orders: {
          orderDetail: {
            products: true,
          }
        }
      }
    });

    if (!foundUser) throw new NotFoundException(`Usuario ${id} no encontrado o inactivo`);
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUsersRepository.findOneBy({ email, isActive: true }); // ← verifica isActive
  }

  async addUser(newUserData: CreateUserDto): Promise<string> {
    const savedUser = await this.ormUsersRepository.save(newUserData);
    return savedUser.id;
  }

  async updateUser(id: string, newUserData: UpdateUserDto): Promise<Omit<Users, 'password'>> {
    const user = await this.ormUsersRepository.findOneBy({ id, isActive: true }); // ← verifica isActive
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado o inactivo`);

    const mergedUser = this.ormUsersRepository.merge(user, newUserData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);
    const { password, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.ormUsersRepository.findOneBy({ id, isActive: true }); // ← verifica isActive
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado o ya inactivo`);

    await this.ormUsersRepository.update(id, { isActive: false });
    return `Usuario con id ${id} desactivado correctamente`;
  }
}