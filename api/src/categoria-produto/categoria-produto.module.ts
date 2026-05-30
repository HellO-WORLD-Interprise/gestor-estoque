import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaProduto } from "./entities/categoria-produto.entity";
import { CategoriaProdutoService } from "./categoria-produto.service";
import { CategoriaProdutoController } from "./categoria-produto.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaProduto])],
    controllers: [CategoriaProdutoController],
    providers: [CategoriaProdutoService],
})
export class CategoriaProdutoModule {}
