import { PickType } from "@nestjs/swagger"; 
import { CreateUserDto } from "./createUsers.Dto";

export class loginUsersDTO extends PickType(CreateUserDto, ['email', 'password']) {}