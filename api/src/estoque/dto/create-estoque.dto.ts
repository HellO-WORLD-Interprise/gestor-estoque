import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString, Min } from "class-validator";

export class CreateEstoqueDto {
    @IsInt()
    @IsNotEmpty({ message: "O ID do produto não pode estar vazio" })
    id_produto: number;

    @IsString()
    @IsNotEmpty({ message: "O número da nota fiscal não pode estar vazio" })
    num_nf: string;

    @IsString()
    @IsNotEmpty({ message: "O lote não pode estar vazio" })
    lote: string;

    @IsInt()
    @Min(0, { message: "A quantidade não pode ser negativa" })
    @IsNotEmpty({ message: "A quantidade não pode estar vazia" })
    qtde: number;

    @IsDateString()
    @IsNotEmpty({ message: "A data de fabricação não pode estar vazia" })
    data_fabricacao: string;

    @IsString()
    @IsOptional()
    observacao?: string;
}
