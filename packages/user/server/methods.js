/* global Accounts, Meteor, User */

Accounts.onCreateUser((options, user) => {
  User.Collection.insert({ parentId: user._id });
  return user;
});

Meteor.methods({
  insertUser(user) {
    return Accounts.createUser(user);
  },

  updateUser(update) {
    return User.Collection.update({ parentId: this.userId }, { $set: update });
  },

  deleteUser(parentId) {
    return User.Collection.remove({ parentId });
  },
});
