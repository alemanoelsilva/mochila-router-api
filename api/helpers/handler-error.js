'use strict';

module.exports = response => (error) =>
  response.status(error.status || 500).json({
    name: error.name || 'IntervalServerError',
    message: error.message || 'internal server error',
    details: error.details || [error],
    status_code: error.status || 500
  });
