Meteor.users.allow({

  insert(){
    return true;
  },

  update(){
    return true;
  },

  remove() {
    return true;
  },

});

Meteor.publish('users', () => {
  return Meteor.users.find();
});
