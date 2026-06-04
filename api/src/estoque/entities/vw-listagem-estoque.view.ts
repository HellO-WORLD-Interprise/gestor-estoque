import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_listagem_estoque",
  expression: `
    select 
      es.id_estoque, 
      es.num_nf, 
      es.lote, 
      pr.nome, 
      es.qtde, 
      to_char(es.data_fabricacao, 'dd/mm/yyyy') as data_fabricacao,
      to_char(es.data_vencimento + (concat((select ct.dias_validade from categoria_produto ct where ct.id_categoria = pr.id_categoria), ' days'))::interval, 'dd/mm/yyyy') as data_vencimento, 
      replace(replace(replace(replace(replace(replace(
        age(es.data_vencimento, current_date)::text, 
        'years', 'anos'),
        'year', 'ano'),
        'mons', 'meses'),
        'mon', 'mês'),
        'days', 'dias'),
        'day', 'dia') 
      as prazo_restante
    from estoque es
    join produtos pr on pr.id_produto = es.id_produto
    where pr.is_ativo = true
  `
})
export class VwListagemEstoque {
  @ViewColumn()
  id_estoque: number;

  @ViewColumn()
  num_nf: string;

  @ViewColumn()
  lote: string;

  @ViewColumn()
  nome: string;

  @ViewColumn()
  qtde: number;

  @ViewColumn()
  data_fabricacao: string;

  @ViewColumn()
  data_vencimento: string;

  @ViewColumn()
  prazo_restante: string;
}
