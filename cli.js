#!/usr/bin/env node

'use strict';

const meow = require('meow');
const cheapestAirfareAmx = require('cheapest-airfare-amx');
const currencyFormatter = require('currency-formatter');

const getValidatedOptions = require('./lib/get-validated-options');
const hasNotificationsEnabled = require('./lib/has-notifications-enabled')();

const cli = meow(`
  Usage
    $ amx-tracker <options>

  Options
    --from <airport>        Origin airport code
    --to <airport>          Destination airport code
    --departure <date>      Departure date in YYYY-MM-DD
    [--return <date>]       Return date in YYYY-MM-DD (optional, leave out if one-way)
    [--deal-price <date>]   Desired total price in Mexican Pesos (optional, leave out to get current cheapest total)
    [--interval <minutes>]  Number of minutes until next run (optional, 30 by default)
`);

const options = getValidatedOptions(cli.flags);

const execute = () => {
  cheapestAirfareAmx(options)
    .then(result => {
      if (!options.dealPrice) {
        console.log(`Cheapest total: ${currencyFormatter.format(result.total, {code: 'MXN'})}. Check it out here: ${result.source}`);
        return;
      }

      if (result.total <= options.dealPrice) {
        const notificationMessage = `Deal alert! New total: ${currencyFormatter.format(result.total, {code: 'MXN'})}. Check it out here: ${result.source}`;

        if (options.dealPrice && hasNotificationsEnabled) {
          const sendNotification = require('./lib/send-notification');
          sendNotification(notificationMessage);
        }

        console.log(notificationMessage);
      }

      setTimeout(execute, options.interval * 60 * 1000);
    })
    .catch(console.error);
};

execute();
