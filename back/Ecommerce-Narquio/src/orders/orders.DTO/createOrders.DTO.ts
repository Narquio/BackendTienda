import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import{ ValidateNested } from "class-validator"
import { Products } from "../../products/products.entity"


export class CreateOrdersDTO {
    @IsNotEmpty({message: `El ID del usuario es obligatorio`})
    @IsUUID('4', {message: `El ID del usuario debe ser un UUID válido`})
    userId!: string

    @IsArray()
    @ArrayMinSize(1, { message: `Debe incluir al menos un producto en la orden` })
    @ValidateNested({ each: true })
    products!: Partial<Products>[]
}