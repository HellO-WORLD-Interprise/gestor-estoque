import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoriaProdutoDto {
    @IsString()
    @IsNotEmpty({ message: "A descrição não pode estar vazia" })
    descricao: string;
}
