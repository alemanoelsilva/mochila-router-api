'use strict';

const handlerError = require('../../../api/helpers/handler-error');

describe('Handler Error Unit tests', () => {
  const response = {
    status: jest.fn(() => ({
      json: jest.fn()
    }))
  };

  const error = new Error('Error for testing');

  describe('Handler Error', () => {
    test('Should return an object of error treated with values default', async () => {
      handlerError(response)(error);

      expect(response.status).toBeCalled;
      expect(response.status().json).toBeCalled;
    });
  });
});
