Meteor.methods({
  insertPage(page) {
    return Page.Collection.insert(page);
  },
  updatePage(_id, update) {
    return Page.Collection.update(_id, { $set: update });
  },
  removePage(_id) {
    return Page.Collection.remove(_id);
  }
});
