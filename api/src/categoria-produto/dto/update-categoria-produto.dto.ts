import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateCategoriaProdutoDto {
    @IsString()
    @IsOptional()
    subcategoria?: string;

    @IsString()
    @IsOptional()
    categoria?: string;

    @IsNumber()
    @IsOptional()
    dias_validade?: number;
}
