const express = require('express');

const app = express();

app.use(express.json());


app.get('/', (_req, res) => res.json({ message: 'kalebe_locadora - servidor simples' }));


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use((_req, res) => res.status(404).json({ message: 'Rota não encontrada' }));


const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

