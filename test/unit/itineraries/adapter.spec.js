'use strict';

const {
  create,
  list,
  update,
  remove,
} = require('../../../api/itineraries/adapter');

const {
  payloadMock: payload,
  listOfItinerariesMock,
} = require('../../helpers');

describe('Itinerary Adapter Unit tests', () => {
  const mock = {
    payload,
    params: {
      id: 'id 1'
    },
    repository: {
      save: jest.fn(data => data),
      update: jest.fn((params, data) => data.name.includes('1') ? 1 : 0),
      delete: jest.fn((params) => params.id.includes('1') ? 1 : 0),
      getAll: jest.fn(() => ({
        itineraries: listOfItinerariesMock,
        count: listOfItinerariesMock.length
      })),
    },
    formatter: {
      created: jest.fn(),
      list: jest.fn(data => data),
    },
    logger: {
      info: jest.fn(),
      error: jest.fn()
    },
    onSuccess: jest.fn(data => data),
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

  describe('List one or many Itineraries', () => {
    test('Should return a list of Itinerary with success', async () => {
      const { data, statusCode } = await list(mock);

      expect(statusCode).toEqual(200);

      expect(data).toHaveProperty('itineraries', listOfItinerariesMock);
      expect(data).toHaveProperty('count', listOfItinerariesMock.length);

      expect(mock.logger.info).toHaveBeenCalledTimes(2);
      expect(mock.repository.getAll).toHaveBeenCalledTimes(1);
      expect(mock.formatter.list).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);

      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return an error, invalid Itinerary', async () => {
      mock.repository.getAll = () => Promise.reject(new Error('invalid Itinerary'));

      const response = await list(mock);

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(0);
      expect(mock.logger.error).toHaveBeenCalledTimes(1);
      expect(mock.onError).toHaveBeenCalledTimes(1);

      expect(response).toHaveProperty('status_code', 'name', 'message', 'details');
      expect(response.status_code).toEqual(500);
      expect(response.message).toEqual('invalid Itinerary');
    });
  });

  describe('Update an Itinerary', () => {
    test('Should return a message with result of success', async () => {
      const { data, statusCode } = await update({
        ...mock,
        payload: {
          ...payload,
          name: 'name with 1'
        }
      });

      expect(statusCode).toEqual(200);

      expect(data).toHaveProperty('message', 'Itinerary was updated with success');

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.repository.update).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);

      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return a message with result of success', async () => {
      const { data, statusCode } = await update(mock);

      expect(statusCode).toEqual(200);

      expect(data).toHaveProperty('message', 'Itinerary was not found');

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.repository.update).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);

      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return an error, invalid Itinerary', async () => {
      mock.repository.update = () => Promise.reject(new Error('invalid Itinerary'));

      const response = await update(mock);

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(0);
      expect(mock.logger.error).toHaveBeenCalledTimes(1);
      expect(mock.onError).toHaveBeenCalledTimes(1);

      expect(response).toHaveProperty('status_code', 'name', 'message', 'details');
      expect(response.status_code).toEqual(500);
      expect(response.message).toEqual('invalid Itinerary');
    });
  });

  describe('Delete an Itinerary', () => {
    test('Should return a message with result of success', async () => {
      const { data, statusCode } = await remove(mock);

      expect(statusCode).toEqual(200);

      expect(data).toHaveProperty('message', 'Itinerary was deleted with success');

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.repository.delete).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);

      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return a message with result of success', async () => {
      const { data, statusCode } = await remove({
        ...mock,
        params: {
          id: '2',
        }
      });

      expect(statusCode).toEqual(200);

      expect(data).toHaveProperty('message', 'Itinerary was not found');

      expect(mock.logger.info).toHaveBeenCalledTimes(1);
      expect(mock.repository.delete).toHaveBeenCalledTimes(1);
      expect(mock.onSuccess).toHaveBeenCalledTimes(1);

      expect(mock.logger.error).toHaveBeenCalledTimes(0);
      expect(mock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return an error, invalid Itinerary', async () => {
      mock.repository.delete = () => Promise.reject(new Error('invalid Itinerary'));

      const response = await remove(mock);

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
