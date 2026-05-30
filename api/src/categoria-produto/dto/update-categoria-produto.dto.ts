import { IsString, IsOptional } from "class-validator";

export class UpdateCategoriaProdutoDto {
    @IsString()
    @IsOptional()
    descricao?: string;
}
