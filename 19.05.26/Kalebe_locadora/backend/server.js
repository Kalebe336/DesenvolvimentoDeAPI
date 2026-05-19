require('dotenv').config();
const express = require('express');
const filmesRouter = require('./src/routes/filmes.route');
const { initDB } = require('./src/config/db');

const app = express();
app.use(express.json());

// root
app.get('/', (_req, res) => res.json({ message: 'kalebe_locadora - servidor' }));

// health
app.get('/health', (_req, res) => res.json({ ok: true }));

// filmes routes
app.use('/filmes', filmesRouter);

// 404
app.use((_req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

const port = Number(process.env.PORT) || 3000;

// try to ensure DB is ready (non-blocking)
initDB().then(() => {
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Falha ao inicializar DB (continuando):', err.message || err);
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port} (DB inacessível)`);
  });
});

