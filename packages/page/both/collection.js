Page.Collection = new Mongo.Collection('pages');

Page.Schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return Meteor.call('currentSiteId');
      }
    },
  },
  showInNav: {
    type: Boolean,
    defaultValue: false,
  },
  pathname: {
    type: String,
  },
  title: {
    type: String,
    defaultValue: '',
  },
  blocks: {
    type: [String],
    defaultValue: [],
  },
});

Page.Collection.attachSchema(Page.Schema);

Page.Collection.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
