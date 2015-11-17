/* global Block, Mongo, SimpleSchema, R */
const { compose } = R;

Block.Collection = new Mongo.Collection('blocks');

Block.Schema.Grid = new SimpleSchema({
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
  }
});

Block.Schema.Base = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
  },
  grid: {
    type: Block.Schema.Grid,
    optional: true,
  },
});

Block.Collection.allow({
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

Block.Collection.attachSchema(Block.Schema.Base);
