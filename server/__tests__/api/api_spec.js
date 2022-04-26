const frisby = require('frisby');

let productId = 37311;

it ('GET request for a single product returns a status of 200 OK', function () {
  return frisby
    .get(`http://0.0.0.0:3030/products/${productId}`)
    .expect('status', 200);
});

it ('GET request for styles returns a status of 200 OK', function () {
  return frisby
    .get(`http://0.0.0.0:3030/products/${productId}/styles`)
    .expect('status', 200);
});

it ('GET request for related products returns a status of 200 OK', function () {
  return frisby
    .get(`http://0.0.0.0:3030/products/${productId}/related`)
    .expect('status', 200);
});

