'use strict';

module.exports = (response, next) => ({ statusCode, data }) => {
  response.data = data;
  response.statusCode = statusCode;
  next();
};
