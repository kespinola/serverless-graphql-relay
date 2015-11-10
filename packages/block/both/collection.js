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
  xsOffset: {
    type: Number,
    defautValue: null,
  },
  smOffset: {
    type: Number,
    defautValue: null,
  },
  mdOffset: {
    type: Number,
    defautValue: null,
  },
  lgOffset: {
    type: Number,
    defautValue: null,
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
    defaultValue: [],
  },
  grid: {
    type: GridSchema,
    optional: true,
  },
});
