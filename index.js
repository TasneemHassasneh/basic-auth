

'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const { sequelize } = require('./src/auth/models');

const { start } = require('./src/server');
sequelize.sync().then(() => {
  start(PORT);
})