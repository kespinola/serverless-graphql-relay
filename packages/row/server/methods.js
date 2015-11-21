/* global Meteor, Row */
Meteor.methods({
  addRow(insert) {
    return Row.Collection.insert(insert);
  },
  updateRow(id, update) {
    return Row.Collection.update(id, { $set: update });
  },
  removeRow(id) {
    return Row.Collection.remove(id);
  },
});
