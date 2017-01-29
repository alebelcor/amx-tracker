'use strict';

import test from 'ava';
import get from '../lib/get-travelers';

test('it should return travelers for one adult only', (t) => {
  t.is(get(), 'A1_C0_I0_PH0_PC0');
});
