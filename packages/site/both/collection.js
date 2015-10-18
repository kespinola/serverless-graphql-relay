const {
  compose,
  } = R;

Site.Collection = new Mongo.Collection('sites');

function joinOwner(doc){
  if(!doc) return doc;
  
  let {
    owner,
  } = doc;
  
  if(_.isString(owner)) doc.owner = Meteor.users.findOne({_id: owner});
  console.log('site joined with owner', owner);
  
  return doc;
}

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
  
  owner: {
    type: String,
    defaultValue: null,
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
