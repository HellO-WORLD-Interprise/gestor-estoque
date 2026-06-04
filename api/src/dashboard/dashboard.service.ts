import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VwDiversidadeProdutos } from './entities/vw-diversidade-produtos.view';
import { VwInventarioTotal } from './entities/vw-inventario-total.view';
import { VwItensEstoqueBaixo } from './entities/vw-itens-estoque-baixo.view';
import { VwItensProximosVencimento } from './entities/vw-itens-proximos-vencimento.view';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(VwDiversidadeProdutos)
        private readonly vwDiversidadeProdutosRepository: Repository<VwDiversidadeProdutos>,
        @InjectRepository(VwInventarioTotal)
        private readonly vwInventarioTotalRepository: Repository<VwInventarioTotal>,
        @InjectRepository(VwItensEstoqueBaixo)
        private readonly vwItensEstoqueBaixoRepository: Repository<VwItensEstoqueBaixo>,
        @InjectRepository(VwItensProximosVencimento)
        private readonly vwItensProximosVencimentoRepository: Repository<VwItensProximosVencimento>,
    ) {}

    async getDiversidadeProdutos() {
        return await this.vwDiversidadeProdutosRepository.find();
    }

    async getInventarioTotal() {
        return await this.vwInventarioTotalRepository.find();
    }

    async getItensEstoqueBaixo() {
        return await this.vwItensEstoqueBaixoRepository.find();
    }

    async getCountItensEstoqueBaixo() {
        return await this.vwItensEstoqueBaixoRepository.count();
    }

    async getItensProximosVencimento() {
        return await this.vwItensProximosVencimentoRepository.find();
    }

    async getCountItensProximosVencimento() {
        return await this.vwItensProximosVencimentoRepository.count();
    }
}
