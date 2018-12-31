'use strict';

const repository = require('./repository');

describe('Itinerary Repository Unit tests', () => {
  const model = {
    create: jest.fn(data => ({ ...data, dataValues: '' }))
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
