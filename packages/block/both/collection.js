/* global Block, Mongo, SimpleSchema */
Block.Collection = new Mongo.Collection('blocks');

const GridSchema = new SimpleSchema({
});

Block.Schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
  },
  grid: {
    type: GridSchema,
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

Block.Collection.attachSchema(Block.Schema);
