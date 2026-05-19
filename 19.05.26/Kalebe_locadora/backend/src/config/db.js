const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kalebe_locadora'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

async function initDB() {
  const client = await pool.connect();
  try {
    // create uuid extension and filmes table if not exists
    await client.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";");
    await client.query(`
      CREATE TABLE IF NOT EXISTS filmes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL
      )
    `);
  } finally {
    client.release();
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  initDB,
};
