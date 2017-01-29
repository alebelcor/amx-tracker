'use strict';

const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function sendNotification(message) {
  twilioClient.sendMessage({
    from: process.env.TWILIO_PHONE_FROM,
    to: process.env.TWILIO_PHONE_TO,
    body: message
  }, function (err) {
    if (err) {
      throw err;
    }
  });
};
