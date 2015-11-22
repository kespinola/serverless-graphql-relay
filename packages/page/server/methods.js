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
  addSection(pageId, parentId) {
    if (!parentId || !pageId) throw new Meteor.Error('parentId and pageId are required');
    const rowId = Meteor.call('addRow', { parentId, pageId });
    const columnId = Meteor.call('addColumn', { parentId: rowId, pageId });
    return { rowId, columnId };
  },
});
