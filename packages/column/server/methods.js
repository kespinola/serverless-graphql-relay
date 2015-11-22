/* global Meteor, Column */
Meteor.methods({
  addColumn(insert) {
    if (!insert.pageId || !insert.parentId) throw new Meteor.Error('pageId and parentId are required');
    return Column.Collection.insert(insert);
  },
  updateColumn(id, update) {
    return Column.Collection.update(id, { $set: update });
  },
  removeColumn(id) {
    return Column.Collection.remove(id);
  },
});
