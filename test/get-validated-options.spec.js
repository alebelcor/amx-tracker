'use strict';

import test from 'ava';
import moment from 'moment';
import isPlainObj from 'is-plain-obj';
import constants from '../lib/constants';
import get from '../lib/get-validated-options';

let options;

test.beforeEach((t) => {
  options = {};

  delete process.env.AMX_TRACKER_ORIGIN_AIRPORT;
  delete process.env.AMX_TRACKER_DEPARTURE_DATE;
  delete process.env.AMX_TRACKER_RETURN_DATE;
  delete process.env.AMX_TRACKER_DEAL_PRICE;
  delete process.env.AMX_TRACKER_INTERVAL;
  delete process.env.AMX_TRACKER_DESTINATION_AIRPORT;
});

test('it should throw an error when origin airport is missing (using options)', (t) => {
  options.from = {};

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is missing');
});

test('it should throw an error when origin airport is missing (using env vars)', (t) => {
  process.env.AMX_TRACKER_ORIGIN_AIRPORT = '';

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is missing');
});

test('it should throw and error when origin airport is invalid', (t) => {
  options.from = 'foo';

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Origin airport code is invalid');
});

test('it should throw an error when destination airport is missing (using options)', (t) => {
  options.from = 'MEX';
  options.to = {};

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is missing');
});

test('it should throw an error when destination airport is missing (using env vars)', (t) => {
  options.from = 'MEX';
  process.env.AMX_TRACKER_DESTINATION_AIRPORT = '';

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is missing');
});

test('it should throw an error when destination airport is invalid', (t) => {
  options.from = 'MEX';
  options.to = 'foo';

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Destination airport code is invalid');
});

test('it should throw an error when departure date is missing (using options)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = {};

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Departure date is missing');
});

test('it should throw an error when departure date is missing (using env vars)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  process.env.AMX_TRACKER_DEPARTURE_DATE = '';

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Departure date is missing');
});

test('it should throw an error when the departure date is in an invalid format', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format('YYYY/MM/DD');

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Departure date is invalid');
});

test('it should throw an error when the departure date is a past date', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().subtract(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Departure date is invalid');
});

test('it should throw an error when the return date is invalid', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().format('YYYY/MM/DD');

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Return date is invalid');
});

test('it should throw an error when the return date is before departure date', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().subtract(1, 'day').format(constants.DATETIME_DATE_FORMAT);

  let error = t.throws(() => {
    get(options);
  }, TypeError);

  t.is(error.message, 'Return date is invalid');
});

test('it should not throw an error when the deal price is missing', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.interval = 40;

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when deal price is invalid (using options)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 'foo';

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when deal price is invalid (env vars)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  process.env.AMX_TRACKER_DEAL_PRICE = 'foo';

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when deal price is zero', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 0;

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when deal price is zero or less', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = -1;

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when the interval is missing', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when the interval is invalid (using options)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  options.interval = {};

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when the interval is invalid (using env vars)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  process.env.AMX_TRACKER_INTERVAL = 'foo';

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when the interval is zero', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  options.interval = 0;

  t.notThrows(() => {
    get(options);
  });
});

test('it should not throw an error when the interval is zero or less', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  options.interval = -1;

  t.notThrows(() => {
    get(options);
  });
});

test('it should return a validated options object (using options)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  options.interval = 40;

  let validated = get(options);

  t.true(isPlainObj(validated));
});

test('it should return a validated options object (using env vars)', (t) => {
  process.env.AMX_TRACKER_ORIGIN_AIRPORT = 'MEX';
  process.env.AMX_TRACKER_DESTINATION_AIRPORT = 'TIJ';
  process.env.AMX_TRACKER_DEPARTURE_DATE = moment().format(constants.DATETIME_DATE_FORMAT);
  process.env.AMX_TRACKER_RETURN_DATE = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  process.env.AMX_TRACKER_DEAL_PRICE = 10000;
  process.env.AMX_TRACKER_INTERVAL = 40;

  let validated = get(options);

  t.true(isPlainObj(validated));
});

test('the options object should have certain members (with return date)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.return = moment().add(1, 'day').format(constants.DATETIME_DATE_FORMAT);
  options.interval = 40;

  let validated = get(options);

  t.true(validated.hasOwnProperty('originAirport'));
  t.true(validated.hasOwnProperty('destinationAirport'));
  t.true(validated.hasOwnProperty('departureDate'));
  t.true(validated.hasOwnProperty('returnDate'));
  t.true(validated.hasOwnProperty('interval'));
});

test('the options object should have certain members (with deal price)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);
  options.dealPrice = 10000;
  options.interval = 40;

  let validated = get(options);

  t.true(validated.hasOwnProperty('originAirport'));
  t.true(validated.hasOwnProperty('destinationAirport'));
  t.true(validated.hasOwnProperty('departureDate'));
  t.true(validated.hasOwnProperty('dealPrice'));
  t.true(validated.hasOwnProperty('interval'));
});

test('the options object should have certain members (always present)', (t) => {
  options.from = 'MEX';
  options.to = 'TIJ';
  options.departure = moment().format(constants.DATETIME_DATE_FORMAT);

  let validated = get(options);

  t.true(validated.hasOwnProperty('originAirport'));
  t.true(validated.hasOwnProperty('destinationAirport'));
  t.true(validated.hasOwnProperty('departureDate'));
  t.true(validated.hasOwnProperty('interval'));
});
