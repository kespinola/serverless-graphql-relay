import { isEmpty } from 'ramda';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connection from './../../config/connection';
import { findOne, findAll } from './../../config/query';

const i18n = {
  BAD_HASH: 'Your password was incorrect',
};
const { TOKEN_SECRET } = process.env;
const columns = ['id', 'first_name', 'last_name'];
const table = 'users';

export const getUser = findOne(table, columns);

export const getUsers = findAll(table, columns);

export const userCreate = ({ email, password }) => new Promise((resolve, reject) => {
  connection.connect();
  connection.beginTransaction((tranErr) => {
    if (tranErr) {
      connection.rollback(reject);
    }

    connection.query(
      'INSERT INTO users SET ?',
      { first_name: null, last_name: null },
      (queryError, { insertId: user_id }) => {
        if (queryError) { connection.rollback(reject); }

        bcrypt.hash(password, 10, (hashErr, password_hash)  => {
          connection.query(
            'INSERT INTO logins SET ?',
            { user_id, password_hash, email },
            (loginErr, response = {}) => {
              const { insertId } = response;
              if (hashErr || loginErr || !insertId) {
                connection.rollback(reject);
              } else {
                jwt.sign(
                  { user_id, email },
                  TOKEN_SECRET,
                  { expiresIn: '30d' },
                  (token) => {
                    resolve({ id: user_id, email, token });
                  });
              }

              connection.commit(connection.end);
            });
        });
      });
  });
});

export const userLogin = ({ email, password }) => new Promise((resolve, reject) => {
  connection.connect();

  connection.query(
  'SELECT password_hash, user_id FROM logins WHERE email = ?',
  email,
  (err, res) => {
    if (err) {
      reject(err);
    } else if (isEmpty(res)) {
      reject(i18n.NO_EMAIL);
    } else {
      const [{ password_hash, user_id }] = res;
      bcrypt.compare(password, password_hash, (hashErr) => {
        if (hashErr) {
          reject(i18n.BAD_HASH);
        } else {
          jwt.sign(
            { user_id, email },
            TOKEN_SECRET,
            { expiresIn: '30d' },
            (token) => resolve({ email, id: user_id, token })
          );
        }
      });
    }
  });

  connection.end();
});
