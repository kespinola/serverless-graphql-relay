import bcrypt from 'bcryptjs';
import Promise from 'bluebird';

export const getHash = (cryptMe) => new Promise((resolve, reject) => {
  bcrypt.hash(cryptMe, 10, (hashErr, hash) => {
    if (hashErr) {
      reject(hashErr);
    } else {
      resolve(hash);
    }
  });
});
