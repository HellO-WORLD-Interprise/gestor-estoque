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