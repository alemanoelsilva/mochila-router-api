'use strict';

const repository = require('./repository');
const Itinerary = require('./model');

const {
  database,
  payloadMock: itinerary,
  listOfItinerariesMock,
} = require('../../test/helpers');

beforeEach(async () => database(Itinerary).destroy());

describe('Itinerary Repository Integration Test', () => {
  describe('Creating Repository', () => {
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
      } catch (error) { }
    });

    test('Should return error when field name is null', async () => {
      try {
        const { create } = repository(Itinerary);

        await create({ ...itinerary, name: null });

      } catch (error) {
        expect(error).toHaveProperty('name', 'SequelizeValidationError');
        expect(error).toHaveProperty('message', 'notNull Violation: itinerary.name cannot be null');
      }
    });
  });

  describe('Listing Repository', () => {
    beforeEach(async () => database(Itinerary).createMany(listOfItinerariesMock));

    test('Should list all itineraries', async () => {
      try {
        const { getAll } = repository(Itinerary);

        const { itineraries, count } = await getAll();

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
      } catch (error) { }
    });

    test('Should return error when the filter contains fields that does not exist on Schema from Database', async () => {
      try {
        const { getAll } = repository(Itinerary);

        await getAll({ limit: 1, page: 1, other_field: null });

      } catch (error) {
        expect(error).toHaveProperty('name', 'SequelizeDatabaseError');
        expect(error).toHaveProperty('message', 'column itinerary.other_field does not exist');
      }
    });
  });

  describe('Updating Repository', () => {
    const itineraryForUpdation = listOfItinerariesMock[0];

    beforeEach(async () => database(Itinerary).createOne(itineraryForUpdation));

    test('Should update an itinerary', async () => {
      try {
        const { getAll, update } = repository(Itinerary);

        const { itineraries } = await getAll();

        const { message } = await update({
          id: itineraries[0]._id
        }, {
          ...itineraries[0],
          name: 'New Name'
        });

        expect(message).toEqual('Itinerary was updated with success');
      } catch (error) { }
    });

    test('Should not update an itinerary', async () => {
      try {
        const { getAll, update } = repository(Itinerary);

        const { itineraries } = await getAll();

        const { message } = await update({
          id: `${itineraries[0]._id.slice(0,35)}1`
        }, {
          ...itineraries[0],
          name: 'New Name'
        });

        expect(message).toEqual('Itinerary was not found');
      } catch (error) { }
    });

    test('Should return error when field _id is not provided', async () => {
      try {
        const { update } = repository(Itinerary);

        await update();

      } catch (error) {
        expect(error.toString()).toEqual("TypeError: Cannot destructure property `id` of 'undefined' or 'null'.");
      }
    });
  });
});
