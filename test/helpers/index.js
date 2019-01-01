'use strict';

const supertest = require('supertest');

const app = require('../../app')();

const request = {
  post: ({ url, data = {} }) => supertest(app).post(url).send(data),

  get: ({ url, query = '' }) => supertest(app).get(url).query(query),

  put: ({ url, data, params = '' }) => supertest(app).put(`${url}/${params}`).send(data),

  delete: ({ url, params = '' }) => supertest(app).delete(`${url}/${params}`),
};

const database = (model) => ({
  findFirst: async (query = {}) => {
    const result = await model.findAll(query);
    return result[0] ? result[0].dataValues || {} : {};
  },

  findAll: async (query = {}) =>
    model
      .findAll({ where: query })
      .map(el => el.dataValues),

  destroy: async (query = {}) => model.destroy({ where: query }),

  createMany: async data => model.bulkCreate(data),

  createOne: async data => model.create(data),
});

const payloadMock = {
  name: 'Teste',
	isPrivate: true,
	description: 'Descrição deste roteiro para teste',
	duration: 5,
	user: 'email_para_teste@gmail.com',
	places: [{
		name: 'Place 1',
		attraction: 'Atração 1'
	}]
};

const listOfItinerariesMock = [{
  isPrivate: true,
  isActive: true,
  name: 'Name of Itinerary 1',
  description: 'The follow Itinerary is about the country XXXX and my vacation in the ...',
  duration: 1,
  user: 'email@email.com',
  places: [ { name: 'Dublin', attraction: 'Temple Bar' } ],
}, {
  isPrivate: false,
  isActive: true,
  name: 'Name of Itinerary 2',
  description: 'The follow Itinerary is about the country XXXX and my vacation in the ...',
  duration: 2,
  user: 'email@email.com',
  places: [ { name: 'Dublin', attraction: 'Temple Bar' } ],
}, {
  isPrivate: true,
  isActive: true,
  name: 'Name of Itinerary 3',
  description: 'The follow Itinerary is about the country XXXX and my vacation in the ...',
  duration: 5,
  user: 'email@email.com',
  places: [ { name: 'Dublin', attraction: 'Temple Bar' } ],
}];

module.exports = {
  request,
  database,
  payloadMock,
  listOfItinerariesMock,
};
