'use strict';

const got = require('got');

const fetchCartId = require('./fetch-cart-id');
const getCityPairDates = require('./get-city-pair-dates');
const getTravelers = require('./get-travelers');
const getResponseBody = require('./get-response-body');
const getNormalizedData = require('./get-normalized-data');

const ENDPOINT = require('./constants').ENDPOINT_DETAILED_FARES;

const getGotOptions = (cartId, options) => {
  return {
    json: true,
    query: {
      'city-pair-dates': getCityPairDates(options),
      'travelers': getTravelers(),
      'store': 'mx',
      'cartId': cartId,
      'pos': 'WEB'
    },
    headers: {
      'user-agent': require('ua-string')
    }
  };
};

module.exports = function fetchDetailedFares(cartId, options) {
  return got.get(ENDPOINT, getGotOptions(cartId, options))
    .then(getResponseBody)
    .then(getNormalizedData)
};
