import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categoria_produto")
export class CategoriaProduto {

    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    descricao: string;
}
