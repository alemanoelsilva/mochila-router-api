'use strict';

const { createItinerary } = require('./api/itinerary/factory');

module.exports = (app) => {
  app.post('/api/itinerary', createItinerary);
};
