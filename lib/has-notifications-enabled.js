'use strict';

module.exports = function hasNotificationsEnabled() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_FROM &&
    process.env.TWILIO_PHONE_TO
  );
};
