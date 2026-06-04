import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriaProdutoModule } from './categoria-produto/categoria-produto.module';
import { EstoqueModule } from './estoque/estoque.module';
import { DashboardModule } from './dashboard/dashboard.module';
import "dotenv/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
    AuthModule,
    ProdutosModule,
    CategoriaProdutoModule,
    EstoqueModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
