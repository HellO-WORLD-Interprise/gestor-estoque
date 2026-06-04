import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estoque } from './entities/estoque.entity';
import { VwListagemEstoque } from './entities/vw-listagem-estoque.view';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Injectable()
export class EstoqueService {

  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
    @InjectRepository(VwListagemEstoque)
    private readonly vwListagemRepository: Repository<VwListagemEstoque>
  ) {}

  async create(createEstoqueDto: CreateEstoqueDto) {
    const newEstoque = this.estoqueRepository.create(createEstoqueDto);
    return await this.estoqueRepository.save(newEstoque);
  }

  async findAll() {
    return await this.estoqueRepository.find({
      where: { is_ativo: true }
    });
  }

  async findByVwListagemCompleta() {
    return await this.vwListagemRepository.find();
  }

  async findOne(id: number) {
    const estoque = await this.estoqueRepository.findOneBy({
      id_estoque: id,
      is_ativo: true
    });

    if (!estoque) {
      throw new NotFoundException(`Estoque com ID ${id} não encontrado`);
    }

    return estoque;
  }

  async update(id: number, updateEstoqueDto: UpdateEstoqueDto) {
    await this.findOne(id);
    await this.estoqueRepository.update({ id_estoque: id }, updateEstoqueDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.estoqueRepository.update({ id_estoque: id }, { is_ativo: false });

    return { message: `Estoque ${id} desativado com sucesso.` };
  }
}
