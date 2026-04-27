import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUsers.Dto";

export class loginUsersDTO extends PickType(CreateUserDto, ['email', 'password']) {

}