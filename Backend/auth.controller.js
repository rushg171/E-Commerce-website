const bcrypt = require('bcrypt');
const { pool } = require('./connector');
const saltRounds = 10;

function sqlError(error, res, connection) {
  if (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
    connection.release();
  }
}

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ success: false, message: 'Username and password required!' });
      return;
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const q = `INSERT INTO user_data (username, hashValue) VALUES ('${username}', '${hash}');`;

    pool.getConnection((mysqlError, connection) => {
      if (mysqlError) return sqlError(mysqlError, res, connection);
      connection.query(q, (qerror, results, fields) => {
        if (qerror) return sqlError(qerror, res, connection);
        if (results.insertId) {
          res.status(200).send({
            success: true,
            message: `${username} successfully registered!`,
          });
        } else {
          res.status(400).json({ success: false, message: 'Error!' });
        }
        connection.release();
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    console.error(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ success: false, message: 'Username and password required!' });
      return;
    }
    const q = `SELECT hashValue FROM user_data WHERE username = '${username}'`;

    pool.getConnection((mysqlError, connection) => {
      if (mysqlError) return sqlError(mysqlError, res, connection);
      connection.query(q, async (qerror, results, fields) => {
        if (qerror) return sqlError(qerror, res, connection);
        await bcrypt
          .compare(password, results[0].hashValue)
          .then((matched) => {
            if (matched)
              res
                .status(200)
                .send({ success: true, message: `Login Successfull!` });
            else
              res
                .status(400)
                .send({ success: false, message: `Incorrect Password` });
          })
          .catch((e) => {
            throw e;
          });
        connection.release();
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    console.error(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { username, password, newPassword } = req.body;
    if (!username || !password || !newPassword) {
      res
        .status(400)
        .json({ success: false, message: 'Username and password required!' });
      return;
    }
    const q = `SELECT hashValue FROM user_data WHERE username = '${username}'`;
    pool.getConnection((mysqlError, connection) => {
      if (mysqlError) return sqlError(mysqlError, res, connection);
      connection.query(q, async (qerror, results, fields) => {
        if (qerror) return sqlError(qerror, res, connection);
        bcrypt
          .compare(password, results[0].hashValue)
          .then((matched) => {
            if (matched) {
              bcrypt.hash(newPassword, saltRounds).then((hash) => {
                connection.query(
                  `UPDATE user_data SET hashValue =  '${hash}' WHERE username = '${username}'`,
                  (q2error, results2) => {
                    if (q2error) {
                      console.error(q2error);
                      res
                        .status(500)
                        .json({ success: false, error: q2error.code });
                      connection.release();
                      return;
                    }
                    if (results2.changedRows == 1) {
                      res.status(200).send({
                        success: true,
                        message: `Password successfully changed!`,
                      });
                    } else {
                      res
                        .status(400)
                        .json({ success: false, message: 'Error!' });
                    }
                  }
                );
              });
            } else
              res
                .status(400)
                .send({ success: false, message: `Incorrect Password` });
          })
          .catch((e) => {
            throw e;
          });
        connection.release();
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    console.error(error);
  }
};
