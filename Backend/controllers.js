const { pool } = require('./connector.js');

exports.home = (req, res) => {
  res.send('Hello Home!');
};

exports.sofa = (req, res) => {
  let q = 'SELECT * FROM product;';
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(q, (error, results, fields) => {
      res.send(results).status(200);
      connection.release();
      if (error) {
        res.status(400).ok(false);
        throw error;
      }
    });
  });
};
