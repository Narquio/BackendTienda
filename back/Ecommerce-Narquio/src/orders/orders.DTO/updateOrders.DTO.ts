import { IsArray, IsOptional, IsUUID, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Products } from "../../products/products.entity";

export class UpdateOrdersDTO {
    @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID del usuario' })
    @IsOptional()
    @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
    userId?: string;

    @ApiPropertyOptional({
        description: 'Lista de productos de la orden (mínimo 1)',
        example: [{ id: '123e4567-e89b-12d3-a456-426614174000' }],
        minItems: 1,
        type: () => [Products],
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1, { message: 'Debe incluir al menos un producto en la orden' })
    @ValidateNested({ each: true })
    @Type(() => Products)
    products?: Partial<Products>[];
}