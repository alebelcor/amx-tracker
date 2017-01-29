'use strict';

import test from 'ava';

import get from '../lib/get-search-deeplink';

const options = {
  originAirport: 'MEX',
  destinationAirport: 'LAX',
  departureDate: '2016-01-01',
  returnDate: '2016-01-05'
};

test('it should return a deeplink URL for the search', (t) => {
  const url = get(options);

  t.is(url, 'https://beta.aeromexico.com/es-mx/reserva/opciones?itinerary=MEX_LAX_2016-01-01.LAX_MEX_2016-01-05&leg=1&travelers=A1_C0_I0_PH0_PC0');
});
