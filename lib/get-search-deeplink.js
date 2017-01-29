'use strict';

const constants = require('./constants');
const getCityPairDates = require('./get-city-pair-dates');
const getTravelers = require('./get-travelers');

module.exports = function getSearchDeeplink(options) {
  return `${constants.ENDPOINT_OPTIONS}` +
    `?itinerary=${getCityPairDates(options)}` +
    '&leg=1' +
    `&travelers=${getTravelers()}`;
};
