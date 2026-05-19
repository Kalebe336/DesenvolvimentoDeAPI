const db = require('../config/db');

class FilmesService {
  async listAll() {
    try {
      const { rows } = await db.query('SELECT * FROM filmes');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findById(id) {
    try {
      const { rows } = await db.query('SELECT * FROM filmes WHERE id = $1', [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async create({ nome, categoria }) {
    try {
      const { rows } = await db.query(
        'INSERT INTO filmes (nome, categoria) VALUES ($1, $2) RETURNING *',
        [nome, categoria]
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id, { nome, categoria }) {
    try {
      const { rows } = await db.query(
        'UPDATE filmes SET nome = $1, categoria = $2 WHERE id = $3 RETURNING *',
        [nome, categoria, id]
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async remove(id) {
    try {
      await db.query('DELETE FROM filmes WHERE id = $1', [id]);
      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new FilmesService();
