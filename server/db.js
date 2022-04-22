const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: "localhost",
  port: process.env.DB_PORT,
  database: "products"
});

pool.connect()
  .then(() => console.log('connected!'))
  .catch((err) => console.log('connection error:', err.message));



module.exports = pool;