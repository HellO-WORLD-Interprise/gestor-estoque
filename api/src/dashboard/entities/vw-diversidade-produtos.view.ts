import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_diversidade_produtos",
  expression: `select count(*) as diversidade_itens from produtos pr where pr.is_ativo = true`
})
export class VwDiversidadeProdutos {
  @ViewColumn()
  diversidade_itens: number;
}
