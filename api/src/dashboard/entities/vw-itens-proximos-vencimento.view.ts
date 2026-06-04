import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_itens_proximos_vencimento",
  expression: `SELECT 
    vle.id_estoque,
    vle.nome,
    AGE(TO_DATE(vle.data_vencimento, 'DD/MM/YYYY'), CURRENT_DATE) AS tempo_restante,
    CASE 
        WHEN TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') < CURRENT_DATE THEN 'Vencido'
        WHEN TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') <= CURRENT_DATE + INTERVAL '1 month' THEN 'Próximo do Vencimento'
        ELSE 'Dentro da Validade'
    END AS status_vencimento
  FROM vw_listagem_estoque vle
  WHERE TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') < CURRENT_DATE + INTERVAL '1 month'`
})
export class VwItensProximosVencimento {
  @ViewColumn()
  id_estoque: number;

  @ViewColumn()
  nome: string;

  @ViewColumn()
  tempo_restante: string;

  @ViewColumn()
  status_vencimento: string;
}
