'use strict';

const moment = require('moment');

const adapter = require('./adapter');
const model = require('./model');
const repository = require('./repository')(model);
const formatter = require('./formatter');

const logger = require('../../config/logger');

const onError = require('../helpers/handler-error');
const onSuccess = require('../helpers/handler-success');
const onNext = require('../helpers/handler-next');

const formatDate = 'MMMM Do YYYY, h:mm:ss a';

module.exports = ({
  create: (request, response) => adapter.create({
    payload: request.body,
    repository: {
      save: repository.create
    },
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response)
  }),

  getAll: (request, response, next) => adapter.getAll({
    query: request.query,
    logger,
    repository: {
      getAll: repository.getAll
    },
    formatter: {
      list: formatter.formatListItinerary({ moment, formatDate })
    },
    onSuccess: onNext(response, next),
    onError: onError(response)
  }),
});
