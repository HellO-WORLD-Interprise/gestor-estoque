import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsInt } from "class-validator";
import { Expose } from "class-transformer";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty({ message: "O nome não pode estar vazio"})
    nome: string;

    @IsEmail({}, { message: "E-mail inválido." })
    email: string;

    @IsString()
    @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    @Expose({ name: "senha" })
    senha_hash: string;

    @IsOptional()
    @IsInt({ message: 'O ID do cargo deve ser um número inteiro' })
    id_cargo?: number;
}