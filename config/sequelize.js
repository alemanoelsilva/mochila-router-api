'use strict';

const Sequelize = require('sequelize');
const { db: { database, user, pass } } = require('./environment');

let connection = null;

const connectDB = () => {
  if (connection) return connection;

  connection = new Sequelize(database, user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
  });

  connection.sync({ force: true })
    .then(() => console.log('Postgres connected'))
    .catch(error => console.log(`Error in the connection Postgres ${error}`))
};

module.exports = connectDB;
