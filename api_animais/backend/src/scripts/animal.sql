CREATE TABLE animal(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INT,
    status_saude VARCHAR(50) DEFAULT 'Saudável'
);

INSERT INTO animal (nome, especie, idade, status_saude)
VALUES 
('Biscoito', 'Cachorro', 8, 'Saudável'),
('Neon', 'Gato', 5, 'Saudável'),
('Fofo', 'Cachorro', 4, 'Saudável'),
('Amora', 'Pônei', 10, 'Saudável'),
('Mel', 'Gato', 6, 'Saudável'),
('Piu-Piu', 'Passaro', 15, 'Saudável'),
('Fragola', 'Gato', 3, 'Saudável'),
('Bolotas', 'Coelho', 10, 'Saudável'),
('Bolha', 'Golfinho', 20, 'Saudável'),
('Pernalonga', 'Avestruz', 58, 'Saudável'),
('Thor', 'Cachorro', 7, 'Saudável'),
('Luna', 'Gato', 4, 'Saudável'),
('Nina', 'Coelho', 2, 'Saudável'),
('Tico', 'Papagaio', 12, 'Saudável'),
('Simba', 'Leão', 9, 'Saudável'),
('Jade', 'Tartaruga', 35, 'Saudável'),
('Bob', 'Hamster', 1, 'Saudável'),
('Estrela', 'Cavalo', 14, 'Saudável'),
('Bidu', 'Cachorro', 5, 'Saudável'),
('Dory', 'Peixe', 3, 'Saudável');

SELECT * FROM animal