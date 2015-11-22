/* global Meteor, Row */
Meteor.methods({
  addRow(insert) {
    if (!insert.pageId) throw new Meteor.Error('pageId is required');
    return Row.Collection.insert(insert);
  },
  updateRow(id, update) {
    return Row.Collection.update(id, { $set: update });
  },
  removeRow(id) {
    return Row.Collection.remove(id);
  },
});
