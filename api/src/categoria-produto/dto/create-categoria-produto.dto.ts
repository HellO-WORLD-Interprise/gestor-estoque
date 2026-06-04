import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoriaProdutoDto {
    @IsString()
    @IsNotEmpty({ message: "A subcategoria não pode estar vazia" })
    subcategoria: string;

    @IsString()
    @IsNotEmpty({ message: "A categoria não pode estar vazia" })
    categoria: string;

    @IsNumber()
    @IsNotEmpty({ message: "Os dias de validade não podem estar vazios" })
    dias_validade: number;
}
