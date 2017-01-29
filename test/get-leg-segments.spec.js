'use strict';

import test from 'ava';
import get from '../lib/get-leg-segments';

import fixtures from './fixtures.json';

let rawLeg = fixtures._collection[0]._collection[0];
let legSegments;

test.beforeEach((t) => {
  legSegments = get(rawLeg);
});

test('it should return an array', (t) => {
  t.true(Array.isArray(legSegments));
});

test('segments should have certain members', (t) => {
  const segment = legSegments[0];

  t.true(segment.hasOwnProperty('originAirport'));
  t.true(segment.hasOwnProperty('departureDate'));
  t.true(segment.hasOwnProperty('departureTime'));
  t.true(segment.hasOwnProperty('destinationAirport'));
  t.true(segment.hasOwnProperty('returnDate'));
  t.true(segment.hasOwnProperty('returnTime'));
  t.true(segment.hasOwnProperty('flightDurationInMinutes'));
  t.true(segment.hasOwnProperty('layoverToNextSegmentsInMinutes'));
});
