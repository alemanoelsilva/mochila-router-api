'use strict';

const repository = require('../../api/itinerary/repository');

describe('Itinerary Repository Unit tests', () => {
  const model = {
    create: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create an Itinerary', () => {
    test('Should execute create function', () => {
      const { create } = repository(model);

      create();

      expect(model.create).toBeCalled;

    });
  });
});
