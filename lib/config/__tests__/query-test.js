import { describe, it } from 'mocha';
import { expect } from 'chai';
import { readyFields } from './../query';

describe('query functions', () => {
  describe('readyFields', () => {
    it('should ready lookup and values for query string', () => {
      const result = readyFields({ id: 1, name: 'Kyle' });
      expect(result).to.eql({ lookup: 'id = ?, name = ?', values: [1, 'Kyle'] });
    });
  });
});
