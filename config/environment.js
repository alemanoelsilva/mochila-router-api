'use strict';

const dotenv = require('dotenv')

dotenv.load();

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT
  },
  db: {
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PASS
  }
};
