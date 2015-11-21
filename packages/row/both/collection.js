/* global Row, Mongo, SimpleSchema, R, Block */
Row.Collection = new Mongo.Collection('rows');

Row.Schema.Grid = new SimpleSchema({
  centerXs: {
    type: Boolean,
    defaultValue: true,
  },
  centerSm: {
    type: Boolean,
    defaultValue: true,
  },
  centerMd: {
    type: Boolean,
    defaultValue: true,
  },
  centerLg: {
    type: Boolean,
    defaultValue: true,
  },
});

Row.Schema.Base = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
    defaultValue: null,
  },
  pageId: {
    type: String,
  },
  grid: {
    type: Row.Schema.Grid,
    optional: true,
  },
});

Row.Collection.allow({
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

Row.Collection.attachSchema(Row.Schema.Base);
