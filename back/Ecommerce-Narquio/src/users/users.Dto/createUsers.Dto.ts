import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { MatchPassword } from "../../customDecorators/matchPassword.decorator";

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo (3-80 caracteres)' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres' })
    name!: string;

    @ApiProperty({ example: 'juan@email.com', description: 'Correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email!: string;

    @ApiProperty({ example: 'Password1!', description: 'Mínimo 8 caracteres, máximo 15, con mayúscula, minúscula, número y símbolo' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 }, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un simbolo' })
    @MaxLength(15, { message: 'La contraseña no debe exceder los 15 caracteres' })
    password!: string;

    @ApiProperty({ example: 'Password1!', description: 'Debe coincidir con el campo password' })
    @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
    @Validate(MatchPassword, ['password'], { message: 'Las contraseñas no coinciden' })
    confirmPassword!: string;

    @ApiProperty({ example: 1234567890, description: 'Número de teléfono' })
    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @IsNumber({}, { message: 'El número de teléfono debe ser un número' })
    phone!: string;

    @ApiProperty({ example: 'Av. Siempreviva 742', description: 'Dirección (3-80 caracteres)' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres' })
    address!: string;

    @ApiProperty({ example: 'Argentina', description: 'País (3-80 caracteres)' })
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El país no debe exceder los 80 caracteres' })
    country!: string;

    @ApiProperty({ example: 'Buenos Aires', description: 'Ciudad (3-80 caracteres)' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La ciudad no debe exceder los 80 caracteres' })
    city!: string;

    @ApiHideProperty()  // ← oculto en Swagger, no debe enviarse
    @IsEmpty()
    isAdmin!: boolean;
}