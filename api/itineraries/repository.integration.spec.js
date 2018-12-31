'use strict';

const repository = require('./repository');
const Itinerary = require('./model');

const { database } = require('../../test/helpers');

const itinerary = {
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

describe('Itinerary Repository Integration Test', () => {
  describe('Creation of itinerary with success', () => {
    test('Should create one itinerary', async () => {
      try {
        const { create } = repository(Itinerary);

        await create(itinerary);

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
      } catch (error) {}
    });
  });

  describe('Creation of itinerary with no success', () => {
    test('Should try create one itinerary', async () => {
      try {
        const { create } = repository(Itinerary);

        await create({ ...itinerary, name: null});

      } catch (error) {
        expect(error).toHaveProperty('name', 'SequelizeValidationError');
        expect(error).toHaveProperty('message', 'notNull Violation: itinerary.name cannot be null');
      }
    });
  });
});
