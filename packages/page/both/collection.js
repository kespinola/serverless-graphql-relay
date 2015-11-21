/* global R, SimpleSchema, Mongo, Meteor, Page, Row */
const { compose } = R;
function joinRow(doc) {
  doc.rows = Row.Collection.find({ pageId: doc._id }).fetch();
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
      joinRow
    )(doc);
  });
});

Page.Collection.after.findOne((userId, selector, options, doc) => {
  if (!doc) return doc;
  compose(
    joinRow
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
