'use strict';

module.exports = function getLowestFare(leg) {
  return leg.fares[0].total;
}
