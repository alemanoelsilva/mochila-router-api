'use strict'

const { connect } = require('./config/sequelize');

const app = require('./app');
const { app: { port }, db: { database, user, pass } } = require('./config/environment');

const logger = require('./config/logger');

const init = async () => {
  let responseDatabase = null;

  try {
    responseDatabase = await connect({ database, user, pass });

  } catch (error) {
    logger.error('There is an error on connection Postgres', error);
    return null;
  };

  if (!responseDatabase) return null;

  app().listen(port, () => {
    logger.info(`Application is running on port ${port}`);
  })
};

init();
