'use strict';

const airports = require('airports');
const moment = require('moment');
const constants = require('./constants');

module.exports = function getValidatedOptions(options) {
  const validatedOptions = {};

  const dealPrice = parseInt(options.dealPrice || process.env.AM_TRACKER_DEAL_PRICE, 10);

  if (isNaN(dealPrice) || dealPrice <= 0) {
    throw new TypeError('Deal price is invalid');
  }

  validatedOptions.dealPrice = dealPrice;

  const originAirport = options.from || process.env.AM_TRACKER_ORIGIN_AIRPORT;

  if (typeof originAirport !== 'string' || originAirport.length === 0) {
    throw new TypeError('Origin airport code is missing');
  }

  if (airports.find((airport) => airport.iata === originAirport) === undefined) {
    throw new TypeError('Origin airport code is invalid');
  }

  validatedOptions.originAirport = originAirport;

  const destinationAirport = options.to || process.env.AM_TRACKER_DESTINATION_AIRPORT;

  if (typeof destinationAirport !== 'string' || destinationAirport.length === 0) {
    throw new TypeError('Destination airport code is missing');
  }

  if (airports.find((airport) => airport.iata === destinationAirport) === undefined) {
    throw new TypeError('Destination airport code is invalid');
  }

  validatedOptions.destinationAirport = destinationAirport;

  const departureDate = options.departure || process.env.AM_TRACKER_DEPARTURE_DATE;

  if (typeof departureDate !== 'string' || departureDate.length === 0) {
    throw new TypeError('Departure date is missing');
  }

  const departureMoment = moment(departureDate, constants.DATETIME_DATE_FORMAT, true);
  const today = moment().format(constants.DATETIME_DATE_FORMAT);

  if (!departureMoment.isValid() || !departureMoment.isSameOrAfter(today)) {
    throw new TypeError('Departure date is invalid');
  }

  validatedOptions.departureDate = departureDate;

  const returnDate = options.return || process.env.AM_TRACKER_RETURN_DATE;

  if (typeof returnDate === 'string' && returnDate.length > 0) {
    const returnMoment = moment(returnDate, constants.DATETIME_DATE_FORMAT, true);

    if (!returnMoment.isValid() || !returnMoment.isSameOrAfter(today)) {
      throw new TypeError('Return date is invalid');
    }

    validatedOptions.returnDate = returnDate;
  }

  const interval = parseInt(options.interval || process.env.AM_TRACKER_INTERVAL, 10) || 30;

  if (interval < 0) {
    throw new TypeError('Interval is invalid');
  }

  validatedOptions.interval = interval;

  const userAgent = process.env.AM_TRACKER_USER_AGENT;

  if (typeof userAgent !== 'string' || userAgent.length === 0) {
    throw new TypeError('Environment variable `AM_TRACKER_USER_AGENT` is missing');
  }

  return validatedOptions;
};
