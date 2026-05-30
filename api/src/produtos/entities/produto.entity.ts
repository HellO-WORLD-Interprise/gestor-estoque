import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("produtos")
export class Produto {
    @PrimaryGeneratedColumn()
    id_produto: number;

    @Column({ unique: true })
    nome: string;

    @Column({ type: "decimal", precision: 10, scale: 2, transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value)
    }})
    preco: number;

    @Column({ nullable: true })
    id_categoria: number;

    @Column()
    descricao: string;

    @Column({ default: true })
    is_ativo: boolean;
}
