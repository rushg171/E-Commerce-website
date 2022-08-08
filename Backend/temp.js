const { pool } = require('./connector');
const bcrypt = require('bcrypt');

const hash = bcrypt.hash('okk', 10);

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query(
    `update user_data set hashValue='${hash}' where username = 'hahauser'`,
    (error, results) => {
      if (error) throw error;
      console.log(results.changedRows);
    }
  );
});
