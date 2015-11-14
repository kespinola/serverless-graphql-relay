/* global Block, Mongo, SimpleSchema */

Block.Collection = new Mongo.Collection('blocks');

Block.Schema.Grid = new SimpleSchema({
  xs: {
    type: Number,
    defaultValue: 12,
  },
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
