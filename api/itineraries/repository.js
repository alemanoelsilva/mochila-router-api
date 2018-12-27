'use strict';

module.exports = (model) => ({
  create: data => model.create(data),

  getAll: async (query) => {
    const { limit, page, ...params } = query;

    const { rows, count } = await model.findAndCountAll({
      where: { ...params },
      limit: limit,
      offset: (page - 1) * limit
    });

    return {
      itineraries: rows.map(itinerary => itinerary.dataValues),
      count
    };
  },
});
