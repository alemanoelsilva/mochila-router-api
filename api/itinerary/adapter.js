'use strict';

module.exports = async ({
  payload,
  repository,
  onSuccess,
  onError,
}) => {

  try {
    const itinerary = formatters.create(payload);

    await repository.save(itinerary);

    return onSuccess();
  } catch (error) {
    console.log(`There is an error in creation of Itinerary, ${JSON,stringify(error)}`);
    return onError(error);
  }
};
