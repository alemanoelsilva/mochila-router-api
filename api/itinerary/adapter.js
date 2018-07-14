'use strict';

exports.createItinerary = async ({
  payload,
  repository,
  onSuccess,
  onError,
}) => {
  try {
    await repository.saveItinerary(payload);

    return onSuccess(201);
  } catch (error) {
    console.log(`There is an error in creation of Itinerary, ${error}`);
    return onError(error);
  }
};
