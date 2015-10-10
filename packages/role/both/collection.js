Role.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  }  
});

Meteor.roles.allow({
  insert(userId, doc) {
    return true;  
  },
  update(userId, doc, fields, modifier) {
    return true;
  },
  remove(userId, doc) {
    return true;
  },
});
