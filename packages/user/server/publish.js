Meteor.publish('user', () => User.Collection.find(this.userId));
Meteor.publish('users', () => User.Collection.find({}) );

Meteor.users.allow({

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
