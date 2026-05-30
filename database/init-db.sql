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
    descricao TEXT NOT NULL
);

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

CREATE OR REPLACE VIEW vw_listagem_completa AS
SELECT 
    pr.id_produto,
    pr.nome, 
    pr.preco, 
    pr.descricao, 
    ct.descricao AS categoria, 
    pr.is_ativo 
FROM produtos pr
JOIN categoria_produto ct ON ct.id_categoria = pr.id_categoria;