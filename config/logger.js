'use strict';

const path = require('path');
const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const { env, logger: { level, backupFileLog } } = require('./environment');

module.exports = bunyan.createLogger({
  name: 'mochila_router_api',
  streams: [{
    stream: process.stdout,
    level,
  }, {
    stream: env !== 'test'
      ? new RotatingFileStream({
        path: path.join(path.resolve(), backupFileLog),
        period: '7d',
        totalFiles: 10,
        rotateExisting: true,
        threshold: '10m',
        totalSize: '20m',
        gzip: false,
      })
      : process.stdout,
    level,
  }],

});
