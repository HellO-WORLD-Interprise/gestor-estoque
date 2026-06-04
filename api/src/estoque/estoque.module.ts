import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './entities/estoque.entity';
import { VwListagemEstoque } from './entities/vw-listagem-estoque.view';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque, VwListagemEstoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
  exports: [EstoqueService]
})
export class EstoqueModule {}
