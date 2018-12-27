'use strict';

const {
  create,
  getAll,
} = require('./api/itineraries/factory');

const {
  getRequest,
  getResponse,
} = require('./api/itineraries/schemas');

const {
  requestValidation,
  responseValidation,
} = require('./api/helpers/schema-validation');

module.exports = (app) => {
  app.post('/api/itineraries',
    // requestValidation({ schema: postRequest, requestType: 'body' }),
    create,
    // responseValidation({ schema: postResponse }),
  );

  app.get('/api/itineraries',
    requestValidation({ schema: getRequest, requestType: 'query' }),
    getAll,
    responseValidation({ schema: getResponse }),
  );

};
