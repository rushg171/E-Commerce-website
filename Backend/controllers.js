const { pool } = require('./connector.js');

exports.home = (req, res) => {
  res.send('Hello Home!');
};

exports.sofa = (req, res) => {
  let q = 'SELECT * FROM product;';
  pool.getConnection((mysqlError, connection) => {
    if (mysqlError) {
      console.error(mysqlError);
      res.status(500).json({ success: false, error: mysqlError.message });
      connection.release();
      return;
    }

    connection.query(q, (qerror, results, fields) => {
      if (qerror) {
        console.error(qerror);
        res.status(500).json({ success: false, error: qerror.code });
        connection.release();
        return;
      }
      res.send(results).status(200);
      connection.release();
    });
  });
};

exports.cart = (req, res) => {
  const { UserID } = req.query;
  const q = `SELECT * FROM product INNER JOIN cart_items ON cart_items.ProductID = product.ProductID WHERE cart_items.UserID = ${UserID}`;
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(q, (error, results, fields) => {
      if (error) {
        res.status(400);
        throw error;
      }
      res.send(results).status(200);
      connection.release();
    });
  });
};
