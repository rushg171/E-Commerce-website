const { pool } = require('./connector');

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query(
    `delete from cart_items where ItemID = 4;`,
    (error, results) => {
      if (error) throw error;
      console.log(results);
    }
  );
});
