import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: `El nombre es obligatorio`})
    @IsString({message: `El nombre debe ser una cadena de texto`})
    @MinLength(3, {message: `El nombre debe tener al menos 3 caracteres`})
    @MaxLength(80, {message: `El nombre no debe exceder los 80 caracteres`})
    name!: string;

    @IsNotEmpty({message: `El correo electrónico es obligatorio`})
    @IsEmail({},{message: `El correo electrónico no es válido`})
    email!: string;

    @IsNotEmpty({message: `La contraseña es obligatoria`})
    @IsString({message: `La contraseña debe ser una cadena de texto`})
    @IsStrongPassword({minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1},
     {message: `La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un simbolo`})
    @MaxLength(15, {message: `La contraseña no debe exceder los 15 caracteres`})
    password!: string;

@IsNotEmpty({message: `El número de teléfono es obligatorio`})
@IsNumber({}, {message: `El número de teléfono debe ser un número`})
    phone!: string;

    
    @IsString({message: `La dirección debe ser una cadena de texto`})
     @MinLength(3, {message: `La dirección debe tener al menos 3 caracteres`})
     @MaxLength(80, {message: `La dirección no debe exceder los 80 caracteres`})     
    address!: string;

     @IsString({message: `El país debe ser una cadena de texto`})
     @MinLength(3, {message: `El país debe tener al menos 3 caracteres`})
     @MaxLength(80, {message: `El país no debe exceder los 80 caracteres`}) 
    country!: string;

     @IsString({message: `La ciudad debe ser una cadena de texto`})
     @MinLength(3, {message: `La ciudad debe tener al menos 3 caracteres`})
     @MaxLength(80, {message: `La ciudad no debe exceder los 80 caracteres`}) 
    city!: string
}