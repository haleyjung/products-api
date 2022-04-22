// const models = require('../models');
const pool = require('../database/db');

module.exports = {
  getProducts: function (req, res) {
    // define page and count here
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) || 5;
    // models.products.getProducts(page, count)
    pool.query(`SELECT * FROM product LIMIT row_count ${count}`)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(500).send(`/products Error: ${err.message}`);
      })
  },

  getProduct: function (req, res) {
    // const { product_id } = req.params;
    // models.products.getProduct(product_id)
    let product = [];
    let productId = req.params.product_id - 37310;
    pool
      .query(`SELECT * FROM product WHERE id = ${productId}`)
      .then(result => product = result.rows)
      .catch(err => res.status(500).send(`Error getting details of product: ${err.message}`));
    pool
      .query(`SELECT feature, value FROM features WHERE product_id = ${productId}`)
      .then(result => {
        product[0].id = product[0].id + 37310;
        product[0].features = result.rows;
        res.status(200).send(product);
      })
      .catch(err => res.status(500).send(`/products/:product_id Error: ${err.message}`));
  },

  getRelated: function (req, res) {
    // const { product_id } = req.params;
    // models.products.getRelated(product_id)
    let productId = req.params.product_id;
    pool
      .query(`SELECT related_product_id from related WHERE current_product_id = ${productId}`)
      .then((result) => {
        let relatedIdArray = [];
        for (let i = 0; i < result.rows.length; i++) {
          relatedId = result.rows[i].related_product_id + 37310;
          relatedIdArray.push(relatedId);
        }
        res.status(200).send(relatedIdArray);
      })
      .catch((err) => {
        res.status(500).send(`Error getting details of product: ${err.message}`);
      })
  }

}