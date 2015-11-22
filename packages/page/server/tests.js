/* global Meteor, describe, context, it, Column */
describe('Meteor.methods', () => {
  describe('addSection', () => {
    context('pageId and parentId params are empty', () => {
      it('should throw an error', test => {
        test.throws(Meteor.call.bind(null, 'addSection', null));
      });
    });
  });
});
