'use strict';

const fetchCartId = require('./fetch-cart-id');
const fetchDetailedFares = require('./fetch-detailed-fares');

module.exports = function fetch(options) {
  return fetchCartId()
    .then((cartId) => {
      return fetchDetailedFares(cartId, options);
    });
};
