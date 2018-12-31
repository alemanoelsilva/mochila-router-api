'use strict';

module.exports = model => ({
  create: async (data) => {
    const { dataValues: itinerary } = await model.create(data);

    return { itinerary };
  },

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

  update: async ({ id: _id }, { createdAt, id, ...data }) => model.update(
    {
      ...data,
      _id,
      updatedAt: new Date()
    }, {
      where: { _id }
    }),

  delete: async ({ id: _id }) => model.destroy({ where: { _id } }),
});
