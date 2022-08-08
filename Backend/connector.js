const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'kkkljdddfs@2A',
  database: 'sofasticated',
});

module.exports = { pool };
