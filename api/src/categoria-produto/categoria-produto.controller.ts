import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CategoriaProdutoService } from "./categoria-produto.service";
import { CreateCategoriaProdutoDto } from "./dto/create-categoria-produto.dto";
import { UpdateCategoriaProdutoDto } from "./dto/update-categoria-produto.dto";

@Controller("categorias")
export class CategoriaProdutoController {
    constructor(
        private readonly categoriaProdutoService: CategoriaProdutoService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createCategoriaProdutoDto: CreateCategoriaProdutoDto) {
        return this.categoriaProdutoService.create(createCategoriaProdutoDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.categoriaProdutoService.findAll();
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    findOne(@Param("id") id: string) {
        return this.categoriaProdutoService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    update(
        @Param("id") id: string,
        @Body() updateCategoriaProdutoDto: UpdateCategoriaProdutoDto
    ) {
        return this.categoriaProdutoService.update(+id, updateCategoriaProdutoDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Param("id") id: string) {
        return this.categoriaProdutoService.remove(+id);
    }
}
