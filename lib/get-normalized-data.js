'use strict';

const getLegs = require('./get-legs');

module.exports = function getNormalizedData(data) {
  return {
    outbound: getLegs(data._collection[0]._collection),
    inbound: getLegs(data._collection[1]._collection)
  };
};
