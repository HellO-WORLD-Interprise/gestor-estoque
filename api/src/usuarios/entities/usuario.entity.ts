import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("usuarios")
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    senha_hash: string;

    @Column({ default: true })
    is_ativo: boolean;

    @Column({ nullable: true })
    id_cargo: number;
}
