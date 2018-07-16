'use strict';

require('dotenv').load();

const ENVIRONMENT = {
  TEST: 'test',
  DEV: 'development',
  PROD: 'production'
};

const env = process.env.NODE_ENV || ENVIRONMENT.DEV;

const vars = {
  env,
  app: {
    port: process.env.PORT
  },
  db: {
    database: env === ENVIRONMENT.TEST ? process.env.POSTGRES_DATABASE_TEST : process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PASS
  }
};

module.exports = vars;
