'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { responseNotFound } = require('./middlewares/not-found');
const { error } = require('./middlewares/error');

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  require('./routes')(app);

  app.use(error);
  app.use(responseNotFound);

  return app;
};
