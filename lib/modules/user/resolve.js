import { isEmpty } from 'ramda';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connection from './../../config/connection';

const { TOKEN_SECRET } = process.env;
const columns = ['id', 'first_name', 'last_name'];

export const getUser = id => new Promise((resolve, reject) => {
  connection.connect();

  connection.query('SELECT ?? FROM users WHERE id = ?', [columns, id], (err, [user]) => {
    if (err) {
      reject(err);
    } else {
      resolve(user);
    }
  });

  connection.end();
});
