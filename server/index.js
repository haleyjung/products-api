const express = require('express');
const app = express();
const pool = require('./db');

const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/loaderio-3a9a273878ec716860d363d6c2c5e32d', (req, res) => {
  res.send('loaderio-3a9a273878ec716860d363d6c2c5e32d');
});

app.get('/products/:product_id', (req, res) => {
  const queryString = `
    SELECT
      product.id,
      product.name,
      product.slogan,
      product.description,
      product.category,
      product.default_price,
    (
      SELECT json_agg(features)
      FROM (
        SELECT
          styles.id AS style_id,
          styles.name,
          styles.original_price,
          styles.sale_price,
          styles.default_style AS "default?"
          FROM styles
          WHERE productId = $1
      ) AS features
    ) AS features
    FROM product
    WHERE id = $1 + 37310
    `;

  return pool
    .query(queryString, [req.params.product_id - 37310])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.error(err.message));
});

app.get('/products/:product_id/styles', (req, res) => {
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
            WHERE productId = $1
        ) AS stylesObj
      ) AS results
      FROM product
      WHERE id = $1 + 37310
  `;

  return pool
    .query(queryString, [req.params.product_id - 37310])
    .then((result) => {
      let styles = result.rows[0].results;
      for (let i = 0; i < styles.length; i++) {
        styles[i].style_id += 220997;
        let skus = styles[i].skus;
        for (let sku in skus) {
          let newKey = (Number(sku) + 1281031).toString();
          skus[newKey] = skus[sku];
          delete skus[sku];
        }
      }
      res.send(result.rows);
    })
    .catch((err) => console.log(err.message));
});

app.get('/products/:product_id/related', (req, res) => {
  pool
    .query(
      `SELECT related_product_id from related WHERE current_product_id = $1`,
      [req.params.product_id - 37310]
    )
    .then((result) => {
      let relatedIdArray = [];
      for (let i = 0; i < result.rows.length; i++) {
        relatedId = result.rows[i].related_product_id + 37310;
        relatedIdArray.push(relatedId);
      }
      res.status(200).send(relatedIdArray);
    })
    .catch((err) =>
      res.status(500).send(`Error getting details of product: ${err.message}`),
    );
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
  console.log(`Server is listening on port ${PORT}`);
});
