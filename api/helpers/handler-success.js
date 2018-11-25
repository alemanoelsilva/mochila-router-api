'use strict';

module.exports = response => (statusCode = 200, data = {}) =>
  response.status(statusCode).json(data);
