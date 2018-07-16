'use strict'

const { connect } = require('./config/sequelize');

const app = require('./app');
const { app: { port }, db: { database, user, pass } } = require('./config/environment');

const init = async () => {
  const response = await connect({ database, user, pass });

  if (!response) return null;

  app().listen(port, () => {
    console.log(`Application is running on port ${port}`);
  })
};

init();
