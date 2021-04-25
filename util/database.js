const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: '#imh2jTRNG2021SN$$'
});

module.exports = pool.promise();