Site.Collection = new Mongo.Collection('sites');

const LoginServiceSchema = new SimpleSchema({
  
  active: {
    type: Boolean,
    defaultValue: false,
  },
  
  primaryKey: {
    type: String,
    optional: true,
  },
  
  secretKey: {
    type: String,
    optional: true,
  }
  
});

Site.Schema = new SimpleSchema({
  
  domain: {
    type: String,
    index: 1,
    unique: true,
  },
  
  owners: {
    type: [String],
    optional: true,
    defaultValue: [],
  },
  
  facebook: {
    type: LoginServiceSchema,
    optional: true,
  },
  
  google: {
    type: LoginServiceSchema,
    optional: true,
  },
  
});

Site.Collection.attachSchema(Site.Schema);

Site.Collection.allow({
  insert(){
    return true;
  },
  update(){
    return true;
  },
  remove(){
    return true;
  }
});
