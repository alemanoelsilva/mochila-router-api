'use strict';

const { create } = require('./adapter');

const payload = {
  name: 'Teste',
	isPrivate: true,
	description: 'Descrição deste roteiro para teste',
	duration: 5,
	user: 'email_para_teste@gmail.com',
	places: [{
		name: 'Place 1',
		attraction: 'Atração 1'
	}]
};

describe('Itinerary Adapter Unit tests', () => {
  const mock = {
    payload,
    repository: {
      save: jest.fn(data => data)
    },
    formatter: {
      created: jest.fn()
    },
    logger: {
      info: jest.fn(),
      error: jest.fn()
    },
    onSuccess: jest.fn(),
    onError: jest.fn(err => ({
      name: err.name || 'IntervalServerError',
      message: err.message || 'internal server error',
      details: err.details || [err],
      status_code: err.status || 500
    }))
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create an Itinerary', () => {
    test('Should create an Itinerary with success', async () => {
      await create(mock);

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.repository.save).toHaveBeenCalledTimes(1);
      expect(mock.formatter.created).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);
      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return an error, invalid Itinerary', async () => {
      mock.repository.save = () => Promise.reject(new Error('invalid Itinerary'));

      const response = await create(mock);

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(0);
      expect(mock.logger.error).toHaveBeenCalledTimes(1);
      expect(mock.onError).toHaveBeenCalledTimes(1);

      expect(response).toHaveProperty('status_code', 'name', 'message', 'details');
      expect(response.status_code).toEqual(500);
      expect(response.message).toEqual('invalid Itinerary');
    });
  });
});
