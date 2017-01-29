'use strict';

import test from 'ava';
import isPlainObj from 'is-plain-obj';
import get from '../lib/get-legs';

import fixtures from './fixtures.json';

let rawLegs = fixtures._collection[0]._collection;
let legs;
let leg;

test.beforeEach((t) => {
  legs = get(rawLegs);
  leg = legs[0];
});

test('it should return an array', (t) => {
  t.true(Array.isArray(legs));
});

test('leg should be an object', (t) => {
  t.true(isPlainObj(leg));
});

test('legs should have certain members', (t) => {
  t.true(leg.hasOwnProperty('segments'));
  t.true(leg.hasOwnProperty('fares'));
});
