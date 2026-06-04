import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categoria_produto")
export class CategoriaProduto {

    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    subcategoria: string;

    @Column()
    categoria: string;

    @Column()
    dias_validade: number;
}
