'use strict';

module.exports = (model) => ({
  create: data => model.create(data),
});
