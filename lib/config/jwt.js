import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

const { SIGNUP_TOKEN } = process.env;

export const signToken = (params) => new Promise((resolve, reject) => {
  jwt.sign(params, SIGNUP_TOKEN, { expiresIn: '30d' }, (token, err) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});
