// const pool = require('../database/db');

// module.exports = {
//   // get products by page and count
//   getProducts: function(page, count) {
//     // get a list of products with a count limit
//     const queryString = `SELECT * FROM product LIMIT row_count ${count}`;
//     pool.query(queryString, (err, results) => {
//       if (err) {
//         console.log('err in models: getProducts');
//       } else {
//         callback(err, results);
//       }
//     })
//   },

//   getProduct: function() {
//     const queryString = `SELECT * FROM product WHERE id = ${req.params.product_id}`;
//     pool.query(queryString, (err, results) => {
//       if (err) {
//         console.log('err in models: getProduct');
//       } else {
//         callback(err, results);
//       }
//     })
//   },

//   getRelated: function() {
//     const queryString = `SELECT * from related WHERE current_product_id = ${req.params.product_id}`;
//     pool.query(queryString, (err, results) => {
//       if (err) {
//         console.log('err in models: getRelated');
//       } else {
//         callback(err, results);
//       }
//     })
//   }
// }