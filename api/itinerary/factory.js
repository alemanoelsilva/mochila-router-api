'use strict';

const adapter = require('./adapter');
const model = require('./model');
const repository = require('./repository')(model);

const onError = require('../helpers/handler-error');
const onSuccess = require('../helpers/handler-success');

module.exports = ({
  createItinerary: (request, response) => adapter.createItinerary({
    payload: request.body,
    repository: {
      saveItinerary: repository.create
    },
    onSuccess: onSuccess(response),
    onError: onError(response)
  })
});
