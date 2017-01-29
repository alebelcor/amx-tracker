'use strict';

const getLegSegments = require('./get-leg-segments');
const getLegFares = require('./get-leg-fares');

module.exports = function getLegs(rawLegs) {
  return rawLegs.map((rawLeg) => {
    return {
      segments: getLegSegments(rawLeg),
      fares: getLegFares(rawLeg)
    }
  });
};
