const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quitanda_isabella',
  password: 'senai',
  port: 5432,
});

app.get('/vendas-cliente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT f.nome AS fruta_vendida
      FROM vendas v
      JOIN frutas f ON v.fruta_id = f.id
      WHERE v.cliente_id = $1`;
    
    const resultado = await pool.query(query, [id]);
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao conectar com o banco" });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});