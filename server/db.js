const { Pool } = require('pg');
require('dotenv').config();
const { PG_USER, PG_PASSWORD, PG_PORT } = process.env;

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: "localhost",
  port: PG_PORT,
  database: "products"
});

pool.connect()
  .then(() => console.log('connected!'))
  .catch((err) => console.log('connection error:', err.message));

  // const poolWrapper = {
  //     async connect() {
  //         for (let nRetry = 1; ; nRetry++) {
  //             try {
  //                 const client = await pool.connect();
  //                 if (nRetry > 1) {
  //                     console.info('Now successfully connected to Postgres');
  //                 }
  //                 return client;
  //             } catch (e) {
  //                 if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
  //                     console.info('ECONNREFUSED connecting to Postgres, ' +
  //                         'maybe container is not ready yet, will retry ' + nRetry);
  //                     // Wait 1 second
  //                     await new Promise(resolve => setTimeout(resolve, 1000));
  //                 } else {
  //                     throw e;
  //                 }
  //             }
  //         }
  //     }
  // };

module.exports = pool;

// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();
// const { PG_USER, PG_PASSWORD, PG_PORT, PG_DBNAME } = process.env;

// const user = PG_USER;
// const password = PG_PASSWORD;
// const host = "localhost";
// const port = PG_PORT;
// const database = PG_DBNAME;

// const db = new Sequelize(database, user, password, {
//   host: host,
//   port: port,
//   dialect: 'postgres',
//   logging: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// const Product = db.define('product', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: DataTypes.STRING,
//   slogan: DataTypes.STRING(500),
//   description: DataTypes.STRING(500),
//   category: DataTypes.STRING,
//   default_price: DataTypes.STRING,
// }, {
//   underscored: true,
// });

// const Styles = db.define('styles', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: DataTypes.STRING,
//   original_price: DataTypes.STRING,
//   sale_price: DataTypes.STRING,
//   default_style: BOOLEAN,
// }, {
//   underscored: true,
//   indexes: [{ fields: ['product_id']}],
// });

// const Features = db.define('features', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   feature: DataTypes.STRING(50),
//   value: DataTypes.STRING(50)
// }, {
//   underscored: true,
//   indexes: [{ fields: ['product_id']}],
// })

// const Photos = db.define('photos', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   thumbnail_url: DataTypes.TEXT,
//   url: DataTypes.TEXT,
// }, {
//   underscored: true,
//   indexes: [{ fields: ['styles_id'] }],
// })

// module.exports = { Product };