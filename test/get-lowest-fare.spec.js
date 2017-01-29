'use strict';

import test from 'ava';
import get from '../lib/get-lowest-fare';

let leg = {
  fares: [{
    total: 1000
  }, {
    total: 2000
  }]
};
let lowestFare;

test.beforeEach((t) => {
  lowestFare = get(leg);
});

test('it should return the lowest fare', (t) => {
  t.is(lowestFare, 1000);
});
