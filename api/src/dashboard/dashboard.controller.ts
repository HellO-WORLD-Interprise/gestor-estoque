import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @Get('diversidade-produtos')
  @UseGuards(JwtAuthGuard)
  getDiversidadeProdutos() {
    return this.dashboardService.getDiversidadeProdutos();
  }

  @Get('inventario-total')
  @UseGuards(JwtAuthGuard)
  getInventarioTotal() {
    return this.dashboardService.getInventarioTotal();
  }

  @Get('itens-estoque-baixo')
  @UseGuards(JwtAuthGuard)
  getItensEstoqueBaixo() {
    return this.dashboardService.getItensEstoqueBaixo();
  }

  @Get('itens-estoque-baixo/count')
  @UseGuards(JwtAuthGuard)
  async getCountItensEstoqueBaixo() {
    const count = await this.dashboardService.getCountItensEstoqueBaixo();
    return { count };
  }

  @Get('itens-proximos-vencimento')
  @UseGuards(JwtAuthGuard)
  getItensProximosVencimento() {
    return this.dashboardService.getItensProximosVencimento();
  }

  @Get('itens-proximos-vencimento/count')
  @UseGuards(JwtAuthGuard)
  async getCountItensProximosVencimento() {
    const count = await this.dashboardService.getCountItensProximosVencimento();
    return { count };
  }
}
