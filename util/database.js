const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '#imh2jTRNG2021SN$$', { 
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;