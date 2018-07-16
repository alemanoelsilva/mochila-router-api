'use strict';

const { request, model } = require('../helpers');

const Itinerary = require('../../api/itinerary/model');

const URL_ITINERARY = '/api/itineraries';
const payload = {};

describe('Itinerary Create Integration Test', () => {
  describe('Creation of itinerary with success', () => {
    test('Should create one itinerary with property places has one unique object', async () => {
      const response = await request.post({
        url: URL_ITINERARY,
        data: payload
      });

      expect(response.body).toEqual({});
      expect(response.statusCode ).toEqual(201);

      const itineraryDB = await model(Itinerary).findAll(); 

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

    });

    test('Should create one itinerary with property places will is empty', async () => {

    });
  });

  describe('Creation of itinerary with no success', () => {
    test('Should return object with error when property name is not defined, null or empty value at the payload', async () => {

    });

    test('Should return object with error when property isPrivate is not boolean value at the payload', async () => {

    });

    test('Should return object with error when property description will is less than 150 characters', async () => {

    });

    test('Should return object with error when property duration is negative value at the payload', async () => {

    });


    test('Should return object with error when property user is not defined, null or empty value at the payload', async () => {

    });

    test('Should return object with error when property place is not defined at the payload', async () => {

    });
  });
});