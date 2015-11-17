/* global R, SimpleSchema, Mongo, Meteor, Page, Block */
const { compose } = R;
function joinSections(doc) {
  doc.sections = Block.Collection.find({ parentId: doc._id }).fetch();
  return doc;
}

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
});

Page.Collection.attachSchema(Page.Schema);

Page.Collection.after.find((userId, selector, options, cursor) => {
  return cursor.map(doc => {
    return compose(
      joinSections
    )(doc);
  });
});

Page.Collection.after.findOne((userId, selector, options, doc) => {
  if (!doc) return doc;
  compose(
    joinSections
  )(doc);
});

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
