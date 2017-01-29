'use strict';

import test from 'ava';
import fn from '../lib/has-notifications-enabled';

let options;

test.beforeEach((t) => {
  delete process.env.TWILIO_ACCOUNT_SID;
  delete process.env.TWILIO_AUTH_TOKEN;
  delete process.env.TWILIO_PHONE_FROM;
  delete process.env.TWILIO_PHONE_TO;
});

test('it should return false when any env var is missing', (t) => {
  t.false(fn());
});

test('it should return true when all env vars are set', (t) => {
  process.env.TWILIO_ACCOUNT_SID = 'foo';
  process.env.TWILIO_AUTH_TOKEN = 'foo';
  process.env.TWILIO_PHONE_FROM = 'foo';
  process.env.TWILIO_PHONE_TO = 'foo';

  t.true(fn());
});
