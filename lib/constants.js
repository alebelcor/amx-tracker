'use strict';

const URL_ORIGIN = 'https://beta.aeromexico.com';

const URL_PATHNAME_API = '/api/v1';
const URL_PATHNAME_OPTIONS = '/es-mx/reserva/opciones';

const ENDPOINT = `${URL_ORIGIN}${URL_PATHNAME_API}`;

module.exports = {
  ENDPOINT_CARTS: `${ENDPOINT}/carts`,
  ENDPOINT_DETAILED_FARES: `${ENDPOINT}/fares/detailed`,
  ENDPOINT_OPTIONS: `${URL_ORIGIN}${URL_PATHNAME_OPTIONS}`,

  DATETIME_DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_PARSE_FORMAT: 'YYYY-MM-DDTHH:mm:ss',
  DATETIME_TIME_FORMAT: 'h:mma'
};
