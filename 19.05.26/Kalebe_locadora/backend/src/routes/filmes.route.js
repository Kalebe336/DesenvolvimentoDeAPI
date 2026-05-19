const express = require('express');
const filmesService = require('../services/filmes.service');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const filmes = await filmesService.listAll();
    res.json(filmes);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Erro interno' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const filme = await filmesService.findById(req.params.id);
    if (!filme) return res.status(404).json({ message: 'Filme não encontrado' });
    res.json(filme);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Erro interno' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, categoria } = req.body;
    if (!nome || !categoria) return res.status(400).json({ message: 'nome e categoria são obrigatórios' });
    const novo = await filmesService.create({ nome, categoria });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Erro interno' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nome, categoria } = req.body;
    const atualizado = await filmesService.update(req.params.id, { nome, categoria });
    if (!atualizado) return res.status(404).json({ message: 'Filme não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Erro interno' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await filmesService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message || 'Erro interno' });
  }
});

module.exports = router;
