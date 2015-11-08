Meteor.methods({
  insertPage(page) {
    return Page.Collection.insert(page);
  },
});
