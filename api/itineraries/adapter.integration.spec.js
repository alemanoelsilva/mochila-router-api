'use strict';

const {
  request,
  database,
  payloadMock: payload,
  listOfItinerariesMock
} = require('../../test/helpers');

const Itinerary = require('./model');

const URL_ITINERARY = '/api/itineraries';

beforeEach(async () => database(Itinerary).destroy());

describe('Itinerary Adapter Integration Test', () => {
  describe('Creating of itinerary', () => {
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
        data: {
          ...payload, places: [{
            name: 'name place for test 1', attraction: 'attraction place for test 1'
          }, {
            name: 'name place for test 2', attraction: 'attraction place for test 2'
          }]
        }
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
        expect(place).toHaveProperty('name', `name place for test ${index + 1}`);
        expect(place).toHaveProperty('attraction', `attraction place for test ${index + 1}`);
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
        data: { ...payload, isPrivate: 'STRING' }
      });

      expect(statusCode).toEqual(400);
      expect(body).toHaveProperty('message', 'child \"isPrivate\" fails because [\"isPrivate\" must be a boolean]');

      const itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toEqual({});
    });

    test('Should return object with error when property isActive is not boolean value at the payload', async () => {
      const { body, statusCode } = await request.post({
        url: URL_ITINERARY,
        data: { ...payload, isActive: 'STRING' }
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

  describe('Listing of itineraries', () => {
    beforeEach(async () => database(Itinerary).createMany(listOfItinerariesMock));

    test('Should return all itinerary registered on API (Or first 10 register on DB)', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('itineraries');
      expect(body).toHaveProperty('count');

      const { itineraries, count } = body;

      expect(count).toEqual(3);
      expect(itineraries.length).toEqual(3);

      itineraries.forEach((itinerary, index) => {
        expect(itinerary.isPrivate).toEqual(listOfItinerariesMock[index].isPrivate);
        expect(itinerary.isActive).toEqual(listOfItinerariesMock[index].isActive);
        expect(itinerary.name).toEqual(listOfItinerariesMock[index].name);
        expect(itinerary.description).toEqual(listOfItinerariesMock[index].description);
        expect(itinerary.duration).toEqual(listOfItinerariesMock[index].duration);
        expect(itinerary.user).toEqual(listOfItinerariesMock[index].user);
        expect(itinerary.places).toEqual(listOfItinerariesMock[index].places);
      });

      const itineraryDB = await database(Itinerary).findAll();

      expect(itineraryDB.length).toEqual(3);
    });

    test('Should return only one itinerary filtered by field "duration" when it is equal 5 "days"', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY,
        query: { duration: 5 },
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('itineraries');
      expect(body).toHaveProperty('count');

      const { itineraries, count } = body;

      expect(count).toEqual(1);
      expect(itineraries.length).toEqual(1);

      const newListMock = listOfItinerariesMock.filter(el => el.duration === 5);

      itineraries.forEach((itinerary, index) => {
        expect(itinerary.isPrivate).toEqual(newListMock[index].isPrivate);
        expect(itinerary.isActive).toEqual(newListMock[index].isActive);
        expect(itinerary.name).toEqual(newListMock[index].name);
        expect(itinerary.description).toEqual(newListMock[index].description);
        expect(itinerary.duration).toEqual(newListMock[index].duration);
        expect(itinerary.user).toEqual(newListMock[index].user);
        expect(itinerary.places).toEqual(newListMock[index].places);
      });

      const itineraryDB = await database(Itinerary).findAll({ duration: 5 });

      expect(itineraryDB.length).toEqual(1);
    });

    test('Should return first page of itineraries', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY,
        query: { page: 1, limit: 1 },
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('itineraries');
      expect(body).toHaveProperty('count');

      const { itineraries, count } = body;

      expect(count).toEqual(3);
      expect(itineraries.length).toEqual(1);

      itineraries.forEach((itinerary) => {
        expect(itinerary.isPrivate).toEqual(listOfItinerariesMock[0].isPrivate);
        expect(itinerary.isActive).toEqual(listOfItinerariesMock[0].isActive);
        expect(itinerary.name).toEqual(listOfItinerariesMock[0].name);
        expect(itinerary.description).toEqual(listOfItinerariesMock[0].description);
        expect(itinerary.duration).toEqual(listOfItinerariesMock[0].duration);
        expect(itinerary.user).toEqual(listOfItinerariesMock[0].user);
        expect(itinerary.places).toEqual(listOfItinerariesMock[0].places);
      });
    });

    test('Should return second page of itineraries', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY,
        query: { page: 2, limit: 1 },
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('itineraries');
      expect(body).toHaveProperty('count');

      const { itineraries, count } = body;

      expect(count).toEqual(3);
      expect(itineraries.length).toEqual(1);

      itineraries.forEach((itinerary) => {
        expect(itinerary.isPrivate).toEqual(listOfItinerariesMock[1].isPrivate);
        expect(itinerary.isActive).toEqual(listOfItinerariesMock[1].isActive);
        expect(itinerary.name).toEqual(listOfItinerariesMock[1].name);
        expect(itinerary.description).toEqual(listOfItinerariesMock[1].description);
        expect(itinerary.duration).toEqual(listOfItinerariesMock[1].duration);
        expect(itinerary.user).toEqual(listOfItinerariesMock[1].user);
        expect(itinerary.places).toEqual(listOfItinerariesMock[1].places);
      });
    });

    test('Should return third page of itineraries', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY,
        query: { page: 3, limit: 1 },
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('itineraries');
      expect(body).toHaveProperty('count');

      const { itineraries, count } = body;

      expect(count).toEqual(3);
      expect(itineraries.length).toEqual(1);

      itineraries.forEach((itinerary) => {
        expect(itinerary.isPrivate).toEqual(listOfItinerariesMock[2].isPrivate);
        expect(itinerary.isActive).toEqual(listOfItinerariesMock[2].isActive);
        expect(itinerary.name).toEqual(listOfItinerariesMock[2].name);
        expect(itinerary.description).toEqual(listOfItinerariesMock[2].description);
        expect(itinerary.duration).toEqual(listOfItinerariesMock[2].duration);
        expect(itinerary.user).toEqual(listOfItinerariesMock[2].user);
        expect(itinerary.places).toEqual(listOfItinerariesMock[2].places);
      });
    });

    test('Should return error on Schema Validation, API does not permit to filter Itinerary by field "isPrivate"', async () => {
      const { body, statusCode } = await request.get({
        url: URL_ITINERARY,
        query: { isPrivate: true },
      });

      expect(statusCode).toEqual(400);

      expect(body).toHaveProperty('message', '"isPrivate" is not allowed');
    });
  });

  describe('Updating of itinerary', () => {
    const itineraryForUpdation = listOfItinerariesMock[0];

    beforeEach(async () => database(Itinerary).createOne(itineraryForUpdation));

    test('Should update the name of itinerary', async () => {
      let itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', itineraryForUpdation.name);
      expect(itineraryDB.updatedAt).toBeNull();

      const { body, statusCode } = await request.put({
        url: URL_ITINERARY,
        data: { ...itineraryDB, name: 'New Name for Itinerary' },
        params: itineraryDB._id
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('message', 'Itinerary was updated with success');

      itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', 'New Name for Itinerary');
      expect(itineraryDB.updatedAt).not.toBeNull();
    });

    test('Should not update itinerary when field id is not found', async () => {
      let itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', itineraryForUpdation.name);
      expect(itineraryDB.updatedAt).toBeNull();

      const { body, statusCode } = await request.put({
        url: URL_ITINERARY,
        data: { ...itineraryDB, name: 'New Name for Itinerary' },
        params: `${itineraryDB._id.slice(0, 35)}2`
      });

      expect(statusCode).toEqual(200);

      expect(body).toHaveProperty('message', 'Itinerary was not found');

      itineraryDB = await database(Itinerary).findFirst();

      expect(itineraryDB).toHaveProperty('name', itineraryForUpdation.name);
      expect(itineraryDB.updatedAt).toBeNull();
    });
  });
});
