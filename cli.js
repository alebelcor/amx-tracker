#!/usr/bin/env node

'use strict';

const meow = require('meow');

const getValidatedOptions = require('./lib/get-validated-options');
const fetch = require('./lib/fetch');
const getLowestTotal = require('./lib/get-lowest-total');
const getSearchDeeplink = require('./lib/get-search-deeplink');
const hasNotificationsEnabled = require('./lib/has-notifications-enabled')();
const currencyFormatter = require('currency-formatter');
const sendNotification = require('./lib/send-notification');

const cli = meow(`
  Requirements
    Set up AM_TRACKER_USER_AGENT environmental variable

  Usage
    $ am-tracker <options>

  Options
    --from        Origin airport code
    --to          Destination airport code
    --departure   Departure date in YYYY-MM-DD
    --return      Return date in YYYY-MM-DD (optional, leave out if one-way)
    --deal-price  Desired total price in Mexican Pesos (optional, leave out to get current cheapest total)
    --interval    Number of minutes until next run (optional, 30 by default)
`);

const options = getValidatedOptions(cli.flags);

const execute = () => {
  fetch(options)
    .then(getLowestTotal)
    .then((lowestTotal) => {
      if (!options.dealPrice) {
        console.log(`Cheapest total: ${currencyFormatter.format(lowestTotal, {code: 'MXN'})}. Check it out here: ${getSearchDeeplink(options)}`);
        return;
      }

      if (lowestTotal <= options.dealPrice) {
        const notificationMessage = `Deal alert! New total: ${currencyFormatter.format(lowestTotal, {code: 'MXN'})}. Check it out here: ${getSearchDeeplink(options)}`;

        if (options.dealPrice && hasNotificationsEnabled) {
          sendNotification(notificationMessage);
        }

        console.log(notificationMessage);
      }

      setTimeout(execute, options.interval * 60 * 1000);
    })
    .catch(console.error)
};

execute();
