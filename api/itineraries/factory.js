'use strict';

const moment = require('moment');
const Sequelize = require('sequelize');

const adapter = require('./adapter');
const model = require('./model');
const repository = require('./repository')(model, Sequelize.Op);
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
    formatter: {
      created: formatter.formatItinerary({ moment, formatDate })
    },
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response)
  }),

  list: (request, response, next) => adapter.list({
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

  update: (request, response) => adapter.update({
    payload: request.body,
    params: {
      id: request.params.id
    },
    repository: {
      update: repository.update
    },
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response)
  }),

  remove: (request, response) => adapter.remove({
    params: {
      id: request.params.id
    },
    repository: {
      delete: repository.delete
    },
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response)
  }),

  listByPlaces: (request, response) => adapter.listByPlaces({
    query: request.query,
    repository: {
      getByPlaces: repository.getByPlaces
    },
    formatter: {
      list: formatter.formatListItinerary({ moment, formatDate })
    },
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response)
  }),
});
