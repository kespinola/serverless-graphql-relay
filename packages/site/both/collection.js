const {
  compose,
  } = R;

Site.Collection = new Mongo.Collection('sites');

function generateFullName(doc){
  
  const {
    profile,
    } = doc;

  if(profile) doc.full_name = `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : null}`;
  
  return doc;
}

function joinOwner(doc){
  doc.owner = Meteor.users.findOne({_id: doc.owner});
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

Site.Collection.after.findOne((userId, selector, options, doc)=> {
  compose(
    generateFullName,
    joinOwner
  )(doc);
});

Site.Collection.after.find((userId, selector, options, cursor) => {
  return cursor.map(doc => {
    return compose(
      generateFullName,
      joinOwner
    )(doc);
  });
});

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
