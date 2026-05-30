import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { VwListagemCompleta } from './entities/vw-listagem-completa.view';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, VwListagemCompleta])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService]
})
export class ProdutosModule {}
