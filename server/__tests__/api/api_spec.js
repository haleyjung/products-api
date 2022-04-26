const frisby = require('frisby');

let baseURL = `http://localhost:3030/products`;

/**
 * Testing get a single product endpoint
 */
describe('Product', function () {
  it ('GET request should return a status of 200 OK', function () {
  return frisby
    .get(`${baseURL}/37311`)
    .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}/37311`)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });
});

/**
 * Testing get styles endpoint
 */
describe('Styles', function () {
  it ('GET request should return a status of 200 OK', function () {
    return frisby
      .get(`${baseURL}/37311/styles`)
      .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}/37311/styles`)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });
});

/**
 * Testing get related products endpoint
 */
describe('Related Products', function () {
  it ('GET request should return a status of 200 OK', function () {
    return frisby
      .get(`${baseURL}/37311/related`)
      .expect('status', 200);
  });

  it ('should have a JSON Content-Type header', function () {
    return frisby
      .get(`${baseURL}/37311/related`)
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });
});
