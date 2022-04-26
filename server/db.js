const { Pool } = require('pg');
require('dotenv').config();
const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DBNAME } = process.env;

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DBNAME
});

pool.connect()
  .then(() => console.log('connected!'))
  .catch((err) => console.log('connection error:', err.message));

module.exports = pool;