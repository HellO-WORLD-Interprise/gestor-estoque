import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoriaProduto } from "./entities/categoria-produto.entity";
import { CreateCategoriaProdutoDto } from "./dto/create-categoria-produto.dto";
import { UpdateCategoriaProdutoDto } from "./dto/update-categoria-produto.dto";

@Injectable()
export class CategoriaProdutoService {
    constructor(
        @InjectRepository(CategoriaProduto)
        private readonly categoriaProdutoRepository: Repository<CategoriaProduto>
    ) {}

    async create(createCategoriaProdutoDto: CreateCategoriaProdutoDto) {
        const novaCategoria = this.categoriaProdutoRepository.create(
        createCategoriaProdutoDto
        );
        return await this.categoriaProdutoRepository.save(novaCategoria);
    }

    async findAll() {
        return await this.categoriaProdutoRepository.find();
    }

    async findOne(id: number) {
        const categoria = await this.categoriaProdutoRepository.findOneBy({
            id_categoria: id,
        });

        if (!categoria) {
            throw new NotFoundException(
                `Categoria de produto com ID ${id} não encontrada`
            );
        }

        return categoria;
    }

    async findCategoriasPrincipais() {
        const categorias = await this.categoriaProdutoRepository
            .createQueryBuilder("ct")
            .select("DISTINCT ct.categoria", "categoria")
            .getRawMany();
        
        return categorias.map(cat => cat.categoria);
    }

    async findSubcategoriasByCategoria(categoria: string) {
        const subcategorias = await this.categoriaProdutoRepository
            .find({
                where: { categoria },
            });
        
        if (!subcategorias || subcategorias.length === 0) {
            throw new NotFoundException(
                `Nenhuma subcategoria encontrada para a categoria: ${categoria}`
            );
        }

        return subcategorias;
    }

    async update( id: number, updateCategoriaProdutoDto: UpdateCategoriaProdutoDto
    ) {
        await this.findOne(id);

        await this.categoriaProdutoRepository.update({ id_categoria: id }, updateCategoriaProdutoDto );

        return await this.findOne(id);
    }

    async remove(id: number) {
        const categoria = await this.findOne(id);

        await this.categoriaProdutoRepository.delete({ id_categoria: id });

        return categoria;
    }
}
