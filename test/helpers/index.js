'use strict';

const supertest = require('supertest');

const app = require('../../app')();

const request = {
  post: ({ url, data = {} }) => supertest(app).post(url).send(data)
};

const model = (model) => ({
  findAll: ({ query = {} }) => model.findAll(query)
});

module.exports = {
  request,
  model,
};