'use strict';

exports.create = async ({
  payload,
  repository,
  formatter,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('New Itinerary will be created with', payload);

    const { itinerary } = await repository.save(payload);

    return onSuccess({
      statusCode: 201,
      data: formatter.created(itinerary)
    });
  } catch (error) {
    logger.error('There is an error at the Itinerary create', error);
    return onError(error);
  }
};

exports.list = async ({
  query,
  logger,
  repository,
  formatter,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('Get Itinerary\'s array filtered by', query);

    const { itineraries, count } = await repository.getAll(query);

    logger.info(`Database returned the follow list of itineraries ${JSON.stringify(itineraries)} with total ${count} itineraries`);

    return onSuccess({
      statusCode: 200,
      data: {
        itineraries: formatter.list(itineraries),
        count
      }
    });
  } catch (error) {
    logger.error('There is an error at the Itinerary find', error);
    return onError(error);
  }
};

exports.update = async ({
  payload,
  params,
  repository,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info(`Itinerary with id ${params.id} will be change with this payload ${JSON.stringify(payload)}`);

    const result = await repository.update(params, payload);

    const messages = {
      '0': 'Itinerary was not found',
      '1': 'Itinerary was updated with success',
    };

    return onSuccess({
      statusCode: 200,
      data: { message: messages[result] }
    });
  } catch (error) {
    logger.error('There is an error at the Itinerary update', error);
    return onError(error);
  }
};

exports.remove = async ({
  params,
  repository,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info(`Itinerary with id ${params.id} will be delete`);

    const result = await repository.delete(params);

    const messages = {
      '0': 'Itinerary was not found',
      '1': 'Itinerary was deleted with success',
    };

    return onSuccess({
      statusCode: 200,
      data: { message: messages[result] }
    });
  } catch (error) {
    logger.error('There is an error at the Itinerary delete', error);
    return onError(error);
  }
};

exports.listByPlaces = async ({
  query,
  logger,
  repository,
  formatter,
  onSuccess,
  onError,
}) => {
  try {
    logger.info(`Get Itinerary\'s array filtered by places.${query.field} equal ${query.value}`);

    let { itineraries: filteredIntineraries } = await repository.getByPlaces();

    if (!!query.field && !!query.value) {
      filteredIntineraries = filteredIntineraries.filter((itinerary) => {
        if (itinerary.places.some((place) => place[query.field].toUpperCase() === query.value.toUpperCase()))
          return itinerary
      })
    }

    logger.info(`Database returned the follow list of itineraries ${JSON.stringify(filteredIntineraries)} with total ${filteredIntineraries.length} itinerary (ies)`);

    return onSuccess({
      statusCode: 200,
      data: {
        itineraries: formatter.list(filteredIntineraries),
        count: filteredIntineraries.length
      }
    });
  } catch (error) {
    logger.error('There is an error at the Itinerary Find by Places', error);
    return onError(error);
  }
};
