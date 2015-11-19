/* global Meteor, describe, context, it, Block */
const PAGE_ID = 1;
const PARENT_ID = 2;

describe('Meteor.method addBlock', () => {
  context('When paylaod has parentId', () => {
    it('Creates a child block', test => {
      const blockId = Meteor.call('addBlock', { parentId: PARENT_ID });
      const { parentId } = Block.Collection.findOne(blockId);
      test.equal(parentId, PARENT_ID);
    });
  });

  context('When payload has pageId', () => {
    it('Creates a block for current page', test => {
      const blockId = Meteor.call('addBlock', {pageId: PAGE_ID });
      const { pageId } = Block.Collection.findOne(blockId);
      test.equal(pageId, PAGE_ID);
    });
  });
});

describe('Meteor.method addBlockSection', () => {
  context('When payload does not include parentId or pageId', () => {
    it('Throws a Meteor.Error', test => {
      test.throws(Meteor.call.bind(null, 'addBlockSection', {}));
    });
  });
});
