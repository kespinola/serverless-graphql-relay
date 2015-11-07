Meteor.publish('profile', () => Meteor.users.find(this.userId));
Meteor.publish('users', () => Meteor.users.find({}) );

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

