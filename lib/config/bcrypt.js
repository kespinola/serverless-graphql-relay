import bcrypt from 'bcryptjs';
import Promise from 'bluebird';

const i18n = {
  BAD_HASH: 'The hash does not match the lookup',
  HASH_ERROR: 'There was an error while comparing hash',
};

export const getHash = (cryptMe) => new Promise((resolve, reject) => {
  bcrypt.hash(cryptMe, 8, (hashErr, hash) => {
    if (hashErr) {
      reject(hashErr);
    } else {
      resolve(hash);
    }
  });
});

export const checkHash = (check, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(check, hash, (hashErr, res) => {
    if (hashErr) {
      reject(i18n.HASH_ERROR);
    } else if (!res) {
      reject(i18n.BAD_HASH);
    } else {
      resolve(check);
    }
  });
});
