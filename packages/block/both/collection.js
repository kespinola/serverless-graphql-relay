Block.Collection = new Mongo.Collection('blocks');

const GridSchema = new SimpleSchema({
  xs: {
    type: Number,
    defaultValue: 12,
  },
  sm: {
    type: Number,
    defautValue: 12,
  },
  md: {
    type: Number,
    defautValue: 12,
  },
  lg: {
    type: Number,
    defautValue: 12,
  },
  xl: {
    type: Number,
    defautValue: 12,
  },
});

Block.Schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
  },
  children: {
    type: [String],
    defaultValue: {},
  },
  grid: {
    type: GridSchema,
    optional: true,
  },
});
