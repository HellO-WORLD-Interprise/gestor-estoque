import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    name: "vw_itens_estoque_baixo",
    expression: `select 
        es.id_estoque,
        es.id_produto, 
        pr.nome,
        sum(es.qtde) as qtde_item 
    from estoque es 
    join produtos pr on pr.id_produto = es.id_produto
    where es.is_ativo = true 
    group by 
        es.id_estoque,
        es.id_produto,
        pr.nome
    having sum(es.qtde) < 50`
})
export class VwItensEstoqueBaixo {
    @ViewColumn()
    id_estoque: number;

  @ViewColumn()
  id_produto: number;

  @ViewColumn()
  nome: string;

  @ViewColumn()
  qtde_item: number;
}
