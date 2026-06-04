CREATE TABLE cargos (
	id_cargo SERIAL PRIMARY KEY,
	descricao TEXT NOT NULL,
    is_ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    id_cargo INT,
    senha_hash TEXT NOT NULL,
	is_ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_usuarios_cargos 
        FOREIGN KEY (id_cargo) 
        REFERENCES cargos (id_cargo) 
        ON DELETE SET NULL
);

INSERT INTO cargos (descricao) VALUES ('Administrador');
INSERT INTO cargos (descricao) VALUES ('Operador');
INSERT INTO cargos (descricao) VALUES ('Gerente');

CREATE TABLE categoria_produto (
    id_categoria SERIAL PRIMARY KEY,
	subcategoria TEXT NOT NULL,
    categoria TEXT NOT NULL,
	dias_validade INT NOT NULL
);

INSERT INTO categoria_produto (subcategoria, categoria, dias_validade) VALUES
-- Hortifruti (Produtos altamente perecíveis)
('Frutas', 'Hortifruti', 7),
('Verduras e Legumes', 'Hortifruti', 5),
('Ervas e Temperos Frescos', 'Hortifruti', 4),
-- Carnes e Peixes (Perecíveis refrigerados/congelados)
('Carne Bovina Fresca', 'Carnes e Peixes', 3),
('Frango e Aves', 'Carnes e Peixes', 3),
('Peixes e Frutos do Mar', 'Carnes e Peixes', 2),
('Carnes Congeladas', 'Carnes e Peixes', 180),
-- Laticínios e Frios (Perecibilidade média)
('Leites e Iogurtes', 'Laticínios e Frios', 30),
('Queijos e Manteigas', 'Laticínios e Frios', 45),
('Presuntos e Embutidos', 'Laticínios e Frios', 20),
-- Padaria e Confeitaria (Consumo rápido)
('Pães Frescos', 'Padaria e Confeitaria', 2),
('Bolos e Doces', 'Padaria e Confeitaria', 4),
('Salgados e Petiscos', 'Padaria e Confeitaria', 1),
-- Mercearia e Despensa (Produtos não perecíveis / longa validade)
('Arroz, Feijão e Grãos', 'Mercearia e Despensa', 365),
('Massas e Molhos', 'Mercearia e Despensa', 240),
('Óleos, Azeites e Vinagres', 'Mercearia e Despensa', 365),
('Biscoitos e Snacks', 'Mercearia e Despensa', 180),
('Café, Chá e Achocolatados', 'Mercearia e Despensa', 240),
-- Bebidas (Longa validade)
('Refrigerantes e Sucos', 'Bebidas', 180),
('Água Mineral', 'Bebidas', 365),
('Cervejas e Destilados', 'Bebidas', 365),
-- Limpeza (Validade longa industrial)
('Detergentes e Sabões', 'Limpeza', 730),
('Amaciantes e Desinfetantes', 'Limpeza', 730),
-- Higiene e Beleza (Validade longa industrial)
('Shampoos e Sabonetes', 'Higiene e Beleza', 1095),
('Creme Dental e Fio Dental', 'Higiene e Beleza', 1095);

CREATE TABLE produtos (
    id_produto SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    preco DECIMAL (10, 2) NOT NULL,
    id_categoria INT,
    descricao TEXT NOT NULL,
    is_ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_categoria_produtos
        FOREIGN KEY (id_categoria)
        REFERENCES categoria_produto(id_categoria)
        ON DELETE SET NULL
);

CREATE OR REPLACE VIEW vw_listagem_produtos AS
SELECT 
    pr.id_produto,
    pr.nome, 
    pr.preco, 
    pr.descricao, 
    ct.categoria,
    pr.is_ativo 
FROM produtos pr
JOIN categoria_produto ct ON ct.id_categoria = pr.id_categoria;

CREATE TABLE estoque (
	id_estoque SERIAL PRIMARY KEY,
    id_produto INT,
	num_nf TEXT NOT NULL,
    lote TEXT NOT NULL,
    qtde INT NOT NULL,
    data_fabricacao DATE NOT NULL,
    data_vencimento DATE,
	observacao TEXT,
    is_ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_estoque_produtos
        FOREIGN KEY (id_produto)
        REFERENCES produtos(id_produto)
        ON DELETE SET NULL
);

create or replace view vw_listagem_estoque as
select 
	es.id_estoque, 
	es.num_nf, 
	es.lote, 
	pr.nome, 
	es.qtde, 
	to_char(es.data_fabricacao, 'dd/mm/yyyy') as data_fabricacao,
	to_char(es.data_vencimento, 'dd/mm/yyyy') as data_vencimento, 
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
where es.is_ativo = true;

CREATE OR REPLACE FUNCTION calcular_data_vencimento()
RETURNS TRIGGER AS $$
DECLARE
    dias_validade_categoria INT;
BEGIN
    -- Obter dias_validade da categoria do produto
    SELECT ct.dias_validade INTO dias_validade_categoria
    FROM categoria_produto ct
    JOIN produtos pr ON pr.id_categoria = ct.id_categoria
    WHERE pr.id_produto = NEW.id_produto;
    
    -- Se encontrou a categoria, calcular data_vencimento
    IF dias_validade_categoria IS NOT NULL THEN
        NEW.data_vencimento := NEW.data_fabricacao + (dias_validade_categoria || ' days')::INTERVAL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_calcular_vencimento_estoque
BEFORE INSERT ON estoque
FOR EACH ROW
EXECUTE FUNCTION calcular_data_vencimento();

CREATE OR REPLACE VIEW vw_diversidade_produtos AS
select count(*) as diversidade_itens from produtos pr where pr.is_ativo = true;


CREATE OR REPLACE VIEW vw_inventario_total AS
select sum(es.qtde) as inventario from estoque es where es.is_ativo = true;

CREATE OR REPLACE VIEW vw_itens_estoque_baixo AS
SELECT 
    id_estoque,
    id_produto, 
    nome,
    qtde_item
FROM (
    SELECT 
        es.id_estoque,
        es.id_produto, 
        pr.nome,
        SUM(es.qtde) OVER(PARTITION BY es.id_produto) AS qtde_item
    FROM estoque es 
    JOIN produtos pr ON pr.id_produto = es.id_produto
    WHERE es.is_ativo = TRUE
) subconsulta
WHERE qtde_item < 50;

-- Pra fazer um count de itens com estoque baixo:
-- select count(*) as itens_estoque_baixo from vw_itens_estoque_baixo

CREATE OR REPLACE VIEW vw_itens_proximos_vencimento AS
SELECT 
    vle.id_estoque,
    vle.nome,
    AGE(TO_DATE(vle.data_vencimento, 'DD/MM/YYYY'), CURRENT_DATE) AS tempo_restante,
    CASE 
        WHEN TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') < CURRENT_DATE THEN 'Vencido'
        WHEN TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') <= CURRENT_DATE + INTERVAL '1 month' THEN 'Próximo do Vencimento'
        ELSE 'Dentro da Validade'
    END AS status_vencimento
FROM vw_listagem_estoque vle
WHERE TO_DATE(vle.data_vencimento, 'DD/MM/YYYY') < CURRENT_DATE + INTERVAL '1 month';