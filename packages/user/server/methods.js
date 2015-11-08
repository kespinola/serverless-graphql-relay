Accounts.onCreateUser((options, user) => {
  User.Collection.insert({ parentId: user._id });
  return user;
});

Meteor.methods({

  insertUser: user => Accounts.createUser(user),

  updateUser: function(update) {
    return User.Collection.update({ parentId: this.userId}, { $set: { ... update} });
  },

  deleteUser: parentId => User.Collection.remove({ parentId }),

});
