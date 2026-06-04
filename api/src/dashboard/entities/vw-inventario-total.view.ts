import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_inventario_total",
  expression: `select sum(es.qtde) as inventario from estoque es where es.is_ativo = true`
})
export class VwInventarioTotal {
  @ViewColumn()
  inventario: number;
}
