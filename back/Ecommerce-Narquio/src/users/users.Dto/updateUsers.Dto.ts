import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo (3-80 caracteres)' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres' })
    name!: string;

    @ApiPropertyOptional({ example: 'juan@email.com', description: 'Correo electrónico válido' })
    @IsOptional()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email?: string;

    @ApiProperty({ example: 'Password1!', description: 'Mínimo 8 caracteres, máximo 15, con mayúscula, minúscula, número y símbolo' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 }, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un simbolo' })
    @MaxLength(15, { message: 'La contraseña no debe exceder los 15 caracteres' })
    password!: string;

    @ApiProperty({ example: 1234567890, description: 'Número de teléfono' })
    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @IsNumber({}, { message: 'El número de teléfono debe ser un número' })
    phone!: string;

    @ApiPropertyOptional({ example: 'Av. Siempreviva 742', description: 'Dirección (3-80 caracteres)' })
    @IsOptional()
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres' })
    address?: string;

    @ApiPropertyOptional({ example: 'Argentina', description: 'País (3-80 caracteres)' })
    @IsOptional()
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El país no debe exceder los 80 caracteres' })
    country?: string;

    @ApiPropertyOptional({ example: 'Buenos Aires', description: 'Ciudad (3-80 caracteres)' })
    @IsOptional()
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La ciudad no debe exceder los 80 caracteres' })
    city?: string;
}