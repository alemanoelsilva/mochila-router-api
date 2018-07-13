'use strict'

require('./config/sequelize')();

const app = require('./app')
const config = require('./config/environment')

const init = async () => {
  app.listen(config.app.port, () => {
    console.log(`Application is running on port`, config.app.port)
  })
};

init();
