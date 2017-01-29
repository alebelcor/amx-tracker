'use strict';

module.exports = function getLegFares(rawLeg) {
  const rawFares = rawLeg.fares._collection;

  // cheapest one
  const firstFare = rawFares[0];

  return [{
    seatsRemaining: firstFare.seatsRemaining,
    total: firstFare.estimate.currency.total,
    currencyCode: firstFare.estimate.currency.currencyCode
  }];
};
