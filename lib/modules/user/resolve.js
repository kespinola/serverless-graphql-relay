import Promise from 'bluebird';
import { isEmpty } from 'ramda';
import { getHash, checkHash } from './../../config/bcrypt';
import { signToken } from './../../config/jwt';
import {
  findOne,
  findAll,
  insertRow,
  findWhere,
} from './../../config/query';

const i18n = {
  BAD_HASH: 'Your password was incorrect',
  SIGNUP_SUCCESS: 'Login successfully created',
  NO_USER: 'Login is not authenticated',
};
const columns = ['id', 'first_name', 'last_name'];
const userTable = 'users';
const loginTable = 'logins';

export const getUser = findOne(userTable, columns);

export const getUsers = findAll(userTable, columns);

const getLoginInfo = findWhere(loginTable, ['password_hash', 'user_id']);

const insertLogin = insertRow(loginTable);

export const loginCreate = (email, password) => new Promise((resolve, reject) => {
  getHash(password)
    .then((password_hash) => insertLogin({ email, password_hash }))
    .then(id => signToken({ id }))
    .then(value => {
      resolve({ value, message: i18n.SIGNUP_SUCCESS });
    })
    .catch(reject);
});

export const loginUser = (email, password) => new Promise((resolve, reject) => {
  getLoginInfo({ email })
    .then((result) => {
      if (isEmpty(result)) {
        reject(i18n.BAD_HASH);
        return null;
      }

      const [{ password_hash, user_id }] = result;

      if (!user_id) {
        reject(i18n.NO_USER);
        return null;
      }

      return checkHash(password, password_hash);
    })
    .then(() => {
      resolve({ user: { email } });
    })
    .catch(reject);
});

// export const userLogin = ({ email, password }) => new Promise((resolve, reject) => {
//   connection.connect();
//
//   connection.query(
//   'SELECT password_hash, user_id FROM logins WHERE email = ?',
//   email,
//   (err, res) => {
//     if (err) {
//       reject(err);
//     } else if (isEmpty(res)) {
//       reject(i18n.NO_EMAIL);
//     } else {
//       const [{ password_hash, user_id }] = res;
//       bcrypt.compare(password, password_hash, (hashErr) => {
//         if (hashErr) {
//           reject(i18n.BAD_HASH);
//         } else {
//           jwt.sign(
//             { user_id, email },
//             TOKEN_SECRET,
//             { expiresIn: '30d' },
//             (token) => resolve({ email, id: user_id, token })
//           );
//         }
//       });
//     }
//   });
//
//   connection.end();
// });
