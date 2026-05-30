import { IsNotEmpty, IsString, IsInt, IsNumber, Min, Max } from "class-validator";
export class CreateProdutoDto {

    @IsString()
    @IsNotEmpty({ message: "O nome não pode estar vazio"})
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: "O preço deve ter no máximo 2 casas decimais" })
    @Min(0, { message: "O preço não pode ser negativo" })
    @Max(999999, { message: "O preço ultrapassa o valor máximo permitido" })
    @IsNotEmpty({ message: "O preço não pode estar vazio"})
    preco: number;

    @IsInt()
    @IsNotEmpty({ message: "O ID da categoria não pode estar vazio"})
    id_categoria: number;

    @IsString()
    @IsNotEmpty({ message: "A descrição não pode estar vazia"})
    descricao: string;
}
