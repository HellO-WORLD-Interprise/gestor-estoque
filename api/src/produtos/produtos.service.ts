import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from './entities/produto.entity';
import { VwListagemProdutos } from './entities/vw-listagem-completa.view';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(VwListagemProdutos)
    private readonly vwListagemRepository: Repository<VwListagemProdutos>
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const newProduto = this.produtoRepository.create(createProdutoDto);
    return await this.produtoRepository.save(newProduto);
  }

  async findAll() {
    return await this.produtoRepository.find({
      where: { is_ativo: true }
    });
  }

  async findByVwListagemCompleta() {
    return await this.vwListagemRepository.find({
      where: { is_ativo: true }
    });
  }

  async findByCategoria(id: number) {
    const produto = await this.produtoRepository.findOneBy({
      id_categoria: id,
      is_ativo: true
    });

    if (!produto) {
      throw new NotFoundException(`Produto com categoria ${id} não encontrado`);
    }

    return produto;
  }

  async findOne(id: number) {
    const produto = await this.produtoRepository.findOneBy({
      id_produto: id,
      is_ativo: true
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.findOne(id);
    await this.produtoRepository.update({ id_produto: id }, updateProdutoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.produtoRepository.update({ id_produto: id }, { is_ativo: false });

    return { message: `Produto ${id} desativado com sucesso.` };
  }
}
