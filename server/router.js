const controllers = require('./controllers');
const router = require('express').Router();

//*--- testing router connection --*//
router.get('/', (req, res) => {
  res.send('Products endpoint');
})

//*---- return a list of projects; default 5 products; http queries on page and count ----* //
router.get('/products', controllers.products.getProducts);

//*---- return full details of a single product ----* //
router.get('/products/:product_id', controllers.products.getProduct);

// //*---- return styles associated with a particular product; returns photos and skus for each style of the product----* //
// router.get('/products/:product_id/styles', controllers.products.getStyles);

// //*---- return an array of related products ----* //
router.get('/products/:product_id/related', controllers.products.getRelated);

module.exports = router;