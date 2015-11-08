Page.Collection = new Mongo.Collection('page');

Page.Schema = new SimpleSchema({
  route: {
    type: String,
  },
  parentId: {
    type: String,
  },
  title: {
    type: String,
    defaultValue: '',
  },
  blocks: {
    type: [String],
    defaultValue: [],
  }
});

Page.Collection.attachSchema(Page.Schema);
