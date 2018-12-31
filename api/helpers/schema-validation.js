'use strict';

const Joi = require('joi');
const logger = require('../../config/logger');

exports.requestValidation = ({ schema, requestType }) => (request, response, next) => {
  const { error, value } = Joi.validate(request[requestType], schema);

  if (error) {
    logger.error('There is an error on RequestValidation', error);
    return next(error);
  }

  request[requestType] = value;

  return next();
};

exports.responseValidation = ({ schema }) => (request, response, next) => {
  const { error } = Joi.validate(response.data, schema);
  if (error) {
    logger.error('There is an error on RequestValidation', error);
    return next(error);
  }

  return response
    .status(response.statusCode || 200)
    .json(response.data)
    .end();
};
