const express = require('express');
const app = express();
const pool = require('./db');

const cors = require("cors");
const morgan = require("morgan");

require('dotenv').config();
const PORT = process.env.PORT;

// Middlewares for logging and parsing
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('SDC: products API!');
})

app.get('/products/:product_id', (req, res) => {
  let product = [];
  let product_id = req.params.product_id - 37310;
  pool
    .query(`SELECT * FROM product WHERE id = ${product_id}`)
    .then(result => product = result.rows)
    .catch(err => res.status(500).send(`Error getting details of product: ${err.message}`));
  pool
    .query(`SELECT feature, value FROM features WHERE product_id = ${product_id}`)
    .then(result => {
      product[0].id = product[0].id + 37310;
      product[0].features = result.rows;
      res.status(200).send(product);
    })
    .catch(err => res.status(500).send(`/products/:product_id Error: ${err.message}`));
});

app.get('/products/:product_id/styles', (req, res) => {
  let product_id = req.params.product_id - 37310;

  const queryString = `
    SELECT
      product.id AS product_id,
      (
        SELECT json_agg(stylesObj)
        FROM (
          SELECT
            styles.id AS style_id,
            styles.name,
            styles.original_price,
            styles.sale_price,
            styles.default_style AS "default?",
            (
              SELECT json_agg(photosObj)
              FROM (
                SELECT thumbnail_url, url
                FROM photos
                WHERE photos.styleId = styles.id
              ) AS photosObj
            ) AS photos, (
              SELECT json_object_agg (
                skus.id,
                json_build_object('quantity', skus.quantity, 'size', skus.size)
              ) AS skus
              FROM skus
              WHERE skus.styleId = styles.id
            ) AS skus
            FROM styles
            WHERE productId = ${product_id}
        ) AS stylesObj
      ) AS results
      FROM product
      WHERE id = ${product_id} + 37310
  `;

  return pool
    .query(queryString)
    .then(result => {

      let styles = result.rows[0].results;

      // update styles id
      for (let i = 0; i < styles.length; i++) {
        styles[i].style_id += 220997; // -> WORKS!

        // update skus id (+ 1281031)
        let skus = styles[i].skus; // -> obj with keys that need an update

        for (let sku in skus) {
          let newKey = (Number(sku) + 1281031).toString();
          skus[newKey] = skus[sku];
          delete skus[sku];
        }
      }
      res.send(result.rows)
    })
    .catch(err => console.log(err.message));
});

app.get('/products/:product_id/related', (req, res) => {
  let product_id = req.params.product_id - 37310;
  pool
    .query(`SELECT related_product_id from related WHERE current_product_id = ${product_id}`)
    .then((result) => {
      let relatedIdArray = [];
      for (let i = 0; i < result.rows.length; i++) {
        relatedId = result.rows[i].related_product_id + 37310;
        relatedIdArray.push(relatedId);
      }
      res.status(200).send(relatedIdArray);
    })
    .catch((err) => res.status(500).send(`Error getting details of product: ${err.message}`));
});

// app.get('/cart', (req, res) => {
//   let product_id = req.body.product_id;
//   let count = 0;
//   pool
//     .query(`SELECT product_id AS sku_id FROM cart`)
//     .then(result => {
//       for (let i = 0; i < result.rows.length; i++) {
//         let eachProduct = result.rows[i];
//         eachProdcut.count = count;
//       }
//       res.send(result.rows)
//     })
//     .catch(err => res.status(500).send(`Error getting details of product: ${err.message}`));
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});