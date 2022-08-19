const { pool } = require('./connector.js');

exports.home = (req, res) => {
  res.send('Hello Home!');
};

function sqlError(error, res, connection) {
  if (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
    connection.release();
  }
}

exports.sofa = (req, res) => {
  let q = 'SELECT * FROM product;';
  pool.getConnection((mysqlError, connection) => {
    if (mysqlError) return sqlError(mysqlError, res, connection);

    connection.query(q, (qerror, results, fields) => {
      if (qerror) return sqlError(qerror, res, connection);

      res.send(results).status(200);
      connection.release();
    });
  });
};

exports.cartRead = (req, res) => {
  const { UserID } = req.query;
  const q = `SELECT * FROM product INNER JOIN cart_items ON cart_items.ProductID = product.ProductID WHERE cart_items.UserID = ${UserID}`;
  pool.getConnection((err, connection) => {
    if (err) return sqlError(err, res, connection);

    connection.query(q, (error, results, fields) => {
      if (error) return sqlError(error, res, connection);

      res.send(results).status(200);
      connection.release();
    });
  });
};

exports.cartTotal = (req, res) => {
  const { UserID } = req.query;
  const q = `SELECT SUM(Price) FROM product INNER JOIN cart_items ON cart_items.ProductID = product.ProductID WHERE cart_items.UserID = ${UserID}`;
  pool.getConnection((err, connection) => {
    if (err) return sqlError(err, res, connection);

    connection.query(q, (error, results, fields) => {
      if (error) return sqlError(error, res, connection);

      res.send(results).status(200);
      connection.release();
    });
  });
};

exports.cartAddItem = (req, res) => {
  const { UserID, ProductID } = req.body;
  const q = `INSERT INTO cart_items (UserID, ProductID) VALUES (${UserID}, ${ProductID})`;
  pool.getConnection((mysqlError, connection) => {
    if (mysqlError) return sqlError(mysqlError, res, connection);

    connection.query(q, (err, results) => {
      if (err) return sqlError(err, res, connection);
      if (results.insertId)
        res.status(200).json({
          success: true,
          message: 'Item added!',
        });
      connection.release();
    });
  });
};

exports.cartRemoveItem = (req, res) => {
  const { CartItemID } = req.body;
  const q = `DELETE FROM cart_items WHERE ItemID = ${CartItemID}`;
  pool.getConnection((mysqlError, connection) => {
    if (mysqlError) return sqlError(mysqlError, res, connection);

    connection.query(q, (err, results) => {
      if (err) return sqlError(err, res, connection);
      if (results.affectedRows)
        res.status(200).json({
          success: true,
          message: 'Item Removed!',
        });
      connection.release();
    });
  });
};
