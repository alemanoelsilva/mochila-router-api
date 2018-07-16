'use strict';

const Sequelize = require('sequelize');

let connection = null;

const sequelizeDB = ({
  connect: async ({ database, user, pass }) => {
    if (connection) return connection;

    try {
      connection = new Sequelize(database, user, pass, {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false
      });

      console.log(`Database connected ${database}`);

      return connection;
    } catch (error) {
      console.log(`There is an error in the connection Postgres ${error}`);
      return null;
    }
  },

  disconnect: () => {
    connection.close();
  },

  getConnection: () => connection

});

module.exports = sequelizeDB;
