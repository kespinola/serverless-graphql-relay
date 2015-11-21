/* global Column, Mongo, SimpleSchema, R */

Column.Collection = new Mongo.Collection('columns');

Column.Schema.Grid = new SimpleSchema({
  xs: {
    type: Number,
    defaultValue: 12,
    label: 'Extra Small Grid',
  },
  sm: {
    type: Number,
    defaultValue: 12,
    label: 'Small Grid',
  },
  md: {
    type: Number,
    defaultValue: 12,
    label: 'Medium Grid',
  },
  lg: {
    type: Number,
    defaultValue: 12,
    label: 'Large Grid',
  },
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

Column.Schema.Base = new SimpleSchema({
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
    type: Column.Schema.Grid,
    optional: true,
  },
});

Column.Collection.allow({
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

Column.Collection.attachSchema(Column.Schema.Base);
