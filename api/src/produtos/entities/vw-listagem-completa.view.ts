import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_listagem_completa",
  expression: `
    select pr.id_produto, pr.nome, pr.preco, pr.descricao, ct.descricao as categoria, pr.is_ativo 
    from produtos pr
    join categoria_produto ct on ct.id_categoria = pr.id_categoria
  `
})
export class VwListagemCompleta {
  @ViewColumn()
  id_produto: number;

  @ViewColumn()
  nome: string;

  @ViewColumn()
  preco: number;

  @ViewColumn()
  descricao: string;

  @ViewColumn()
  categoria: string;

  @ViewColumn()
  is_ativo: boolean;
}
