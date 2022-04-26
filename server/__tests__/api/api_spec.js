const frisby = require('frisby');

let product_id = 37311;
let baseURL = `http://localhost:3030/products/${product_id}/`;

describe('Product', function () {
  it ('GET request should return a status of 200 OK', function () {
  return frisby
    .get(`${baseURL}`)
    .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}`)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });
});

describe('Styles', function () {
  it ('GET request should return a status of 200 OK', function () {
    return frisby
      .get(`${baseURL}`)
      .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}related`)
      .expect('status', 200);
  });
});

describe('Related Products', function () {
  it ('GET request should return a status of 200 OK', function () {
    return frisby
      .get(`${baseURL}styles`)
      .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}styles`)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });
});

