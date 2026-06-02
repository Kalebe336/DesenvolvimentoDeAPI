const express = require('express');
const router = express.Router();
const { protegerRota } = require('../middleware/auth');
const db = require('../utils/database');

function ensureFavoritosExames(usuario) {
  if (!usuario.favoritos) usuario.favoritos = {};
  if (!Array.isArray(usuario.favoritos.exames)) usuario.favoritos.exames = [];
  return usuario.favoritos;
}

// Alterna favorito de um exame (id do exame)
router.post('/favoritos/exames/toggle', protegerRota, (req, res) => {
  const usuario = db.getById(req.session.usuarioLogado);
  if (!usuario) return res.status(404).send('Usuário não encontrado.');

  const { exameId } = req.body;
  const id = Number(exameId);
  if (!id) return res.status(400).send('exameId inválido');

  const favoritos = ensureFavoritosExames(usuario);
  const idx = favoritos.exames.indexOf(id);
  if (idx >= 0) {
    favoritos.exames.splice(idx, 1);
  } else {
    favoritos.exames.push(id);
  }

  db.update(usuario.id, { favoritos });
  res.json({ success: true, favoritado: favoritos.exames.includes(id) });
});

// Lista favoritados de exames
router.get('/favoritos/exames', protegerRota, (req, res) => {
  const usuario = db.getById(req.session.usuarioLogado);
  if (!usuario) return res.status(404).send('Usuário não encontrado.');

  const favoritos = ensureFavoritosExames(usuario);
  res.json({ favoritosExames: favoritos.exames });
});

module.exports = router;

