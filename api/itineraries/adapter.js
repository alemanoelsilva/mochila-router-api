'use strict';

exports.create = async ({
  payload,
  repository,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('New Itinerary will be created with', payload)
    await repository.save(payload);

    return onSuccess({ statusCode: 201 });
  } catch (error) {
    logger.error('There is an error at the Itinerary create', error);
    return onError(error);
  }
};

exports.getAll = async ({
  query,
  logger,
  repository,
  formatter,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('Get Itinerary\'s array filtered by', query)
    const { itineraries, count } = await repository.getAll(query);

    logger.info('Database returned the follow list of itineraries', formatter.list(itineraries));
    console.log('\n\nDatabase returned the follow list of itineraries', formatter.list(itineraries)[0].places);

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
}
