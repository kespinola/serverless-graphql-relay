/* global Meteor, Column */
Meteor.methods({
  addColumn(insert) {
    return Column.Collection.insert(insert);
  },
  updateColumn(id, update) {
    return Column.Collection.update(id, { $set: update });
  },
  removeColumn(id) {
    return Column.Collection.remove(id);
  },
});
