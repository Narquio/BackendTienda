import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Products } from "../../products/products.entity";

export class CreateOrdersDTO {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID del usuario que realiza la orden' })
    @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
    @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
    userId!: string;

    @ApiProperty({
        description: 'Lista de productos de la orden (mínimo 1)',
        example: [{ id: '123e4567-e89b-12d3-a456-426614174000' }],
        minItems: 1,
        type: () => [Products],
    })
    @IsArray()
    @ArrayMinSize(1, { message: 'Debe incluir al menos un producto en la orden' })
    @ValidateNested({ each: true })
    products!: Partial<Products>[];
}