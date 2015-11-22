/* global Meteor, describe, context, it, Column */
const PAGE_ID = 1;
const PARENT_ID = 3;
describe('Meteor.methods', () => {
  describe('addColumn', () => {
    context('insert is empty', () => {
      it('should throw an error', test => {
        test.throws(Meteor.call.bind(null, 'addColumn', {}));
      });
    });
    context('insert has pageId and parentId', () => {
      const columnId = Meteor.call('addColumn', {pageId: PAGE_ID, parentId: PARENT_ID });
      const { pageId, parentId } = Column.Collection.findOne(columnId);
      it('should create a column doc', test => {
        test.isNotNull(columnId);
      });
      it('should have the pageId', test => {
        test.equal(pageId, PAGE_ID);
      });
      it('should have the parentId', test => {
        test.equal(parentId, PARENT_ID);
      });
    });
  });
});
