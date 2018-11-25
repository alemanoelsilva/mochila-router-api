'use strict';

const supertest = require('supertest');

const app = require('../../app')();

const request = {
  post: ({ url, data = {} }) => supertest(app).post(url).send(data)
};

const model = (model) => ({
  findFirst: async (query = {}) => {
    const result = await model.findAll(query);
    return result[0] ? result[0].dataValues || {} : {};
  },
  destroy: async (query = {}) => model.destroy({ where: query })
});

module.exports = {
  request,
  model,
};