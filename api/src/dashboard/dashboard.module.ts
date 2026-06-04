import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { VwDiversidadeProdutos } from './entities/vw-diversidade-produtos.view';
import { VwInventarioTotal } from './entities/vw-inventario-total.view';
import { VwItensEstoqueBaixo } from './entities/vw-itens-estoque-baixo.view';
import { VwItensProximosVencimento } from './entities/vw-itens-proximos-vencimento.view';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VwDiversidadeProdutos,
      VwInventarioTotal,
      VwItensEstoqueBaixo,
      VwItensProximosVencimento,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
