import { describe, it } from 'mocha';
import { assert } from 'chai';
import { getHash, checkHash } from './../bcrypt';

describe('bcrypt functions', () => {
  describe('getHash', () => {
    const password = 'pw';
    it('should create a string hash from password', () =>
      getHash(password)
        .then((hash) => checkHash(password, hash))
        .then((res) => {
          assert.equal(res, password);
        })
    );
  });
});
