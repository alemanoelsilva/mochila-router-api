'use strict';

exports.responseNotFound = (req, res, next) => {
  res.status(404)
    .json({ message: 'Endpoint was not found' })
    .end();
}
