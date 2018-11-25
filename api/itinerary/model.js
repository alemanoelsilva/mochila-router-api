'use strict';

const Sequelize = require('sequelize');
const { getConnection } = require('../../config/sequelize');

const Itinerary = getConnection().define('itinerary', {
  _id: {
    type: Sequelize.UUID,
    field: '_id',
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  places: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  tableName: 'itinerary',
  timestamps: false
});

Itinerary.sync({ force: false });

module.exports = Itinerary;
