import { PickType } from "@nestjs/swagger";  // ← cambiá mapped-types por swagger
import { CreateUserDto } from "./createUsers.Dto";

export class loginUsersDTO extends PickType(CreateUserDto, ['email', 'password']) {}