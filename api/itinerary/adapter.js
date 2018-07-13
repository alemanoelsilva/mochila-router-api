'use strict';

exports.createItinerary = async ({
  payload,
  repository,
  onSuccess,
  onError,
}) => {
  try {
    await repository.saveItinerary(payload);

    return onSuccess();
  } catch (error) {
    console.log(`There is an error in creation of Itinerary, ${JSON.stringify(error)}`);
    return onError(error);
  }
};
