'use strict';

const {
  create,
  list,
  update,
  remove,
  listByPlaces,
} = require('./api/itineraries/factory');

const {
  postRequest,
  postResponse,
  getRequest,
  getResponse,
  putOrDeleteRequest,
  putOrDeleteResponse,
} = require('./api/itineraries/schemas');

const {
  requestValidation,
  responseValidation,
} = require('./api/helpers/schema-validation');

const URL = {
  ITINERARY: '/api/itineraries',
};

module.exports = (app) => {
  app.post('/api/itineraries',
    requestValidation({ schema: postRequest, requestType: 'body' }),
    create,
    responseValidation({ schema: postResponse }),
  );

  app.get('/api/itineraries',
    requestValidation({ schema: getRequest, requestType: 'query' }),
    list,
    responseValidation({ schema: getResponse }),
  );

  app.put('/api/itineraries/:id',
    requestValidation({ schema: putOrDeleteRequest, requestType: 'params' }),
    update,
    responseValidation({ schema: putOrDeleteResponse }),
  );

  app.delete('/api/itineraries/:id',
    requestValidation({ schema: putOrDeleteRequest, requestType: 'params' }),
    remove,
    responseValidation({ schema: putOrDeleteResponse }),
  );

  app.get('/api/itineraries/place',
  //requestValidation({ schema: putOrDeleteRequest, requestType: 'params' }),
  listByPlaces,
  //responseValidation({ schema: putOrDeleteResponse }),
);

};
