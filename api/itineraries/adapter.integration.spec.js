'use strict';

const { request, database } = require('../../test/helpers');

const Itinerary = require('./model');

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

beforeEach(async () => database(Itinerary).destroy());

describe('Itinerary Create Integration Test', () => {
  describe('Creation of itinerary with success', () => {
    test('Should create one itinerary with property places has one unique object', async () => {
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: payload
      });

      expect(statusCode).toEqual(201);

      expect(body).toHaveProperty('id', 'createdAt', 'name');

      const itineraryDB = await database(Itinerary).findFirst();

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
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, places: [{
          name: 'name place for test 1', attraction: 'attraction place for test 1'
        }, {
          name: 'name place for test 2', attraction: 'attraction place for test 2'
        }]}
      });

      expect(statusCode).toEqual(201);

      expect(body).toHaveProperty('id', 'createdAt', 'name');

      const itineraryDB = await database(Itinerary).findFirst();

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
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, places: [] }
      });

      expect(statusCode).toEqual(201);

      expect(body).toHaveProperty('id', 'createdAt', 'name');

      const itineraryDB = await database(Itinerary).findFirst();

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
      const { name, ...newPayload } = payload;
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: newPayload
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"name\" fails because [\"name\" is required]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property isPrivate is not boolean value at the payload', async () => {
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, isPrivate: 'STRING'}
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"isPrivate\" fails because [\"isPrivate\" must be a boolean]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property isActive is not boolean value at the payload', async () => {
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, isActive: 'STRING'}
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"isActive\" fails because [\"isActive\" must be a boolean]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property description is not defined, null or empty value at the payload', async () => {
      const { description, ...newPayload } = payload;
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: newPayload
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"description\" fails because [\"description\" is required]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property duration is not defined, null or empty value at the payload', async () => {
      const { duration, ...newPayload } = payload;
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: newPayload
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"duration\" fails because [\"duration\" is required]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property user is not defined, null or empty value at the payload', async () => {
      const { user, ...newPayload } = payload;
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: newPayload
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"user\" fails because [\"user\" is required]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property places is null at the payload', async () => {
      const { places, ...newPayload } = payload;
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: newPayload
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"places\" fails because [\"places\" is required]');


      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });
  });
});
