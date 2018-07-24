'use strict';

const { request, model } = require('../helpers');

const Itinerary = require('../../api/itinerary/model');

const URL_ITINERARY = '/api/itineraries';

const payload = {
  name: 'name for test',
  description: 'description for test',
  duration: 5,
  isPrivate: false,
  user: 'user for test',
  places: [{
    name: 'name place for test',
    attraction: 'attraction place for test',
  }],
};

beforeEach(async () => model(Itinerary).destroy());

describe('Itinerary Create Integration Test', () => {
  describe('Creation of itinerary with success', () => {
    test('Should create one itinerary with property places has one unique object', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: payload
      });

      expect(response.body).toEqual({});
      expect(response.statusCode).toEqual(201);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', payload.name);
      expect(itineraryDB).toHaveProperty('isPrivate', payload.isPrivate);
      expect(itineraryDB).toHaveProperty('description', payload.description);
      expect(itineraryDB).toHaveProperty('duration', payload.duration);
      expect(itineraryDB).toHaveProperty('user', payload.user);

      expect(itineraryDB.places.length).toEqual(1);

      itineraryDB.places.forEach((place, index) => {
        expect(place).toHaveProperty('name', payload.places[index].name);
        expect(place).toHaveProperty('attraction', payload.places[index].attraction);
      });
    });

    test('Should create one itinerary with property places has more than one object', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, places: [{
          name: 'name place for test 1', attraction: 'attraction place for test 1'
        }, {
          name: 'name place for test 2', attraction: 'attraction place for test 2'
        }]}
      });

      expect(response.body).toEqual({});
      expect(response.statusCode).toEqual(201);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', payload.name);
      expect(itineraryDB).toHaveProperty('isPrivate', payload.isPrivate);
      expect(itineraryDB).toHaveProperty('description', payload.description);
      expect(itineraryDB).toHaveProperty('duration', payload.duration);
      expect(itineraryDB).toHaveProperty('user', payload.user);

      expect(itineraryDB.places.length).toEqual(2);

      itineraryDB.places.forEach((place, index) => {
        expect(place).toHaveProperty('name', `${payload.places[0].name} ${index + 1}`);
        expect(place).toHaveProperty('attraction', `${payload.places[0].attraction} ${index + 1}`);
      });
    });

    test('Should create one itinerary with property places empty', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, places: [] }
      });

      expect(response.body).toEqual({});
      expect(response.statusCode).toEqual(201);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', payload.name);
      expect(itineraryDB).toHaveProperty('isPrivate', payload.isPrivate);
      expect(itineraryDB).toHaveProperty('description', payload.description);
      expect(itineraryDB).toHaveProperty('duration', payload.duration);
      expect(itineraryDB).toHaveProperty('user', payload.user);

      expect(itineraryDB.places.length).toEqual(0);
      expect(itineraryDB.places).toEqual([]);
    });
  });

  describe('Creation of itinerary with no success', () => {
    test('Should return object with error when property name is not defined, null or empty value at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, name: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.name cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'name');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property isPrivate is not boolean value at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, isPrivate: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.isPrivate cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'isPrivate');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property description is not defined, null or empty value at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, description: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.description cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'description');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property duration is not defined, null or empty value at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, duration: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.duration cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'duration');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property user is not defined, null or empty value at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, user: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.user cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'user');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property places is null at the payload', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, places: null }
      });

      expect(response.body).toHaveProperty('name', 'SequelizeValidationError');
      expect(response.body).toHaveProperty('message', 'notNull Violation: itinerary.places cannot be null');

      const [details] = response.body.details;
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('errors');

      const [errors] = details.errors;

      expect(errors).toHaveProperty('type', 'notNull Violation');
      expect(errors).toHaveProperty('path', 'places');
      expect(errors).toHaveProperty('value', null);

      expect(response.statusCode).toEqual(500);

      const itineraryDB = await model(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });
  });
});