'use strict';

const bunyan = require('bunyan');

const { logger: { level } } = require('./environment');

module.exports = bunyan.createLogger({
  name: 'mochila_router',
  stream: process.stdout,
  level
});
