'use strict';

const moment = require('moment');
const constants = require('./constants');

module.exports = function getLegSegments(rawLeg) {
  const rawSegments = rawLeg.segments._collection;

  return rawSegments.map((rawSegment) => {
    const departing = moment(rawSegment.departureDateTime, constants.DATETIME_PARSE_FORMAT);
    const returning = moment(rawSegment.arrivalDateTime, constants.DATETIME_PARSE_FORMAT);

    const departureDate = departing.format(constants.DATETIME_DATE_FORMAT);
    const departureTime = departing.format(constants.DATETIME_TIME_FORMAT);
    const returnDate = returning.format(constants.DATETIME_DATE_FORMAT);
    const returnTime = returning.format(constants.DATETIME_TIME_FORMAT);

    return {
      originAirport: rawSegment.departureAirport,
      departureDate,
      departureTime,
      destinationAirport: rawSegment.arrivalAirport,
      returnDate,
      returnTime,
      flightDurationInMinutes: rawSegment.flightDurationInMinutes,
      layoverToNextSegmentsInMinutes: rawSegment.layoverToNextSegmentsInMinutes
    };
  });
};
