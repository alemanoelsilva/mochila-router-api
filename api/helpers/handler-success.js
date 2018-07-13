'use strict';

module.exports = response => (statusCode) =>
  response.status(statusCode).json({});
