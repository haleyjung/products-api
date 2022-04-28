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

app.get('/loaderio-38913a730479e2c866cc0d03fbcea8c4', (req, res) => {
  res.send('loaderio-38913a730479e2c866cc0d03fbcea8c4');
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
          features.feature,
          features.value
          FROM features
          WHERE features.product_id = $1
      ) AS features
    ) AS features
    FROM product
    WHERE id = $1
    `;

  return pool
    .query(queryString, [req.params.product_id])
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
      WHERE id = $1
  `;

  return pool
    .query(queryString, [req.params.product_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err.message));
});

app.get('/products/:product_id/related', (req, res) => {
  pool
    .query(
      `SELECT related_product_id from related WHERE current_product_id = $1`,
      [req.params.product_id]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) =>
      res.status(500).send(`Error getting details of product: ${err.message}`),
    );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});