'use strict';

const handlerSuccess = require('./handler-success');

describe('Handler Error Unit tests', () => {
  const response = {
    status: jest.fn(() => ({
      json: jest.fn()
    }))
  };

  describe('Handler Success', () => {
    test('Should execute response function', async () => {
      handlerSuccess(response)();

      expect(response.status).toBeCalled;
      expect(response.status().json).toBeCalled;
    });
  });
});
