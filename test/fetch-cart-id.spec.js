'use strict';

import test from 'ava';
import sinon from 'sinon';
import 'sinon-as-promised';
import got from 'got';

import fetch from '../lib/fetch-cart-id';

let post;

test.before((t) => {
  post = sinon.stub(got, 'post').resolves({
    body: {
      _meta: {
        cartId: `foo-${Math.floor(Math.random() * 1000)}`
      }
    }
  });
});

test.after((t) => {
  post.restore();
});

test('it should return a promise', (t) => {
  t.true(typeof fetch().then === 'function');
});

test('it should return the cart ID', async (t) => {
  const id = await fetch();

  t.true(typeof id === 'string');
  t.true(id.length > 0);
});
