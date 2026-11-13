DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS equipamento CASCADE;
DROP TABLE IF EXISTS agendamento CASCADE;


/*tudo no singular*/

CREATE TABLE usuario(
	id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome VARCHAR (255) NOT NULL,
	email VARCHAR(11) UNIQUE NOT NULL,
	senha VARCHAR(100) UNIQUE NOT NULL,
	role VARCHAR(50) NOT NULL DEFAULT 'normal' CHECK (role IN ('admin', 'normal'))
);
INSERT INTO 

CREATE TABLE cliente(
	id_cliente INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome VARCHAR (255) NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL
);

INSERT INTO cliente (nome, cpf) VALUES
('Ana Lima', '12345678901'),
('Felisberto felis', '54656712398'),
('Bruno Paz', '98765432100');

SELECT * FRO,

CREATE TABLE equipamento(
	id_equipamento INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_cliente INT REFERENCES cliente(id_cliente) NOT NULL,
	modelo VARCHAR (255) NOT NULL,
	descrição VARCHAR (255) NOT NULL,
	custo_manutencao NUMERIC(10,2) NOT NULL CHECK (custo_manutencao >= 0)
);

CREATE TABLE agendamento (
	id_agendamento INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	data_concerto TIMESTAMP NOT NULL,
	id_cliente INT REFERENCES cliente(id_cliente) NOT NULL,
	id_equipamento INT REFERENCES equipamento(id_equipamento) NOT NULL
);