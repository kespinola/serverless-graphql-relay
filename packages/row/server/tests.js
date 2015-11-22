/* global Meteor, describe, context, it, Row */
const PAGE_ID = 1;
describe('Meteor.methods', () => {
  describe('addRow', () => {
    context('insert is empty', () => {
      it('should throw an error', test => {
        test.throws(Meteor.call.bind(null, 'addRow', {}));
      });
    });
    context('insert has pageId', () => {
      const columnId = Meteor.call('addRow', {pageId: PAGE_ID });
      const { pageId } = Row.Collection.findOne(columnId);
      it('should create a column doc', test => {
        test.isNotNull(columnId);
      });
      it('should have the pageId', test => {
        test.equal(pageId, PAGE_ID);
      });
    });
  });
});
