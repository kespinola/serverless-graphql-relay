/* global Meteor, describe, context, it */

describe('Meteor.methods', () => {
  describe('addColumn', () => {
    context('Is empty insert object', test => {
      const columnId = Meteor.method('addColumn', {});
      test.instanceOf(columnId, String);
    });
  });
});
