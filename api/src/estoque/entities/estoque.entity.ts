import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("estoque")
export class Estoque {
    @PrimaryGeneratedColumn()
    id_estoque: number;

    @Column({ nullable: true })
    id_produto: number;

    @Column()
    num_nf: string;

    @Column()
    lote: string;

    @Column()
    qtde: number;

    @Column({ type: "date" })
    data_fabricacao: Date;

    @Column({ type: "date", nullable: true })
    data_vencimento: Date;

    @Column({ nullable: true })
    observacao: string;

    @Column({ default: true })
    is_ativo: boolean;
}
