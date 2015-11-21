/* global Meteor, Page, Block */

Meteor.methods({
  insertPage(page) {
    return Page.Collection.insert(page);
  },
  updatePage(_id, update) {
    return Page.Collection.update(_id, { $set: update });
  },
  removePage(_id) {
    return Page.Collection.remove(_id);
  },
  addSection(parentId, pageId) {
    const rowId = Meteor.call('addRow', { parentId, pageId });
    Meteor.call('addColumn', { parentId: rowId, pageId });
    return rowId;
  }
});
