'use strict';

const got = require('got');
const getResponseBody = require('./get-response-body');

const ENDPOINT = require('./constants').ENDPOINT_CARTS;

const gotOptions = {
  json: true,
  query: {
    'pos': 'WEB',
    'store': 'mx'
  }
};

const getCartId = (data) => {
  return data._meta.cartId;
};

module.exports = function fetchCartId() {
  return got.post(ENDPOINT, gotOptions)
    .then(getResponseBody)
    .then(getCartId);
};
