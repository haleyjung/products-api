const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;

// Redis
const { createClient } = require('redis');
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

const DEFAULT_EXPIRATION = 3600; // 1hr

// * --- middlewares ---- * //
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * --- loader.io ---- * //
var var0 = '/loaderio-a9f179ad9d0fb3143bca38ec33e7f136.txt'
var var1 = '/loaderio-a9f179ad9d0fb3143bca38ec33e7f136.html'
var var2 = '/loaderio-a9f179ad9d0fb3143bca38ec33e7f136/'
app.use((req, res) => {
  let reqPath = req.path;
  if (reqPath === var0 || reqPath === var1 || reqPath === var2) {
    res.send('loaderio-a9f179ad9d0fb3143bca38ec33e7f136')
  }
})

// * ---- redis ----- * //
// app.get('/products/:product_id', (req, res) => {
//   client.get('product', (err, product) => {
//     if (err) console.error(err)
//     if (product != null) {
//       return res.send(JSON.parse(product));
//     } else {
//       console.log('not found in redis')
      // const queryString = `
      //   SELECT
      //     product.id,
      //     product.name,
      //     product.slogan,
      //     product.description,
      //     product.category,
      //     product.default_price,
      //   (
      //     SELECT json_agg(features)
      //     FROM (
      //       SELECT
      //         features.feature,
      //         features.value
      //         FROM features
      //         WHERE features.product_id = $1
      //     ) AS features
      //   ) AS features
      //   FROM product
      //   WHERE id = $1
      //   `;
      // return await pool
      //   .query(queryString, [req.params.product_id])
      //   .then((result) => {
      //     const data = result.rows;
      //     client.set('product', DEFAULT_EXPIRATION, JSON.stringify(data));
      //     res.send(data);
      //   })
      //   .catch((err) => console.error(err.message));
//     }
//   })
// });


// * ---- routes ----- * //
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
      let relatedIdArray = [];
      for (let i = 0; i < result.rows.length; i++) {
        relatedId = result.rows[i].related_product_id ;
        relatedIdArray.push(relatedId);
      }
      res.send(relatedIdArray);
    })
    .catch((err) =>
      res.status(500).send(`Error getting details of product: ${err.message}`),
    );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});