User.Schema = new SimpleSchema({

  username: {
    type: String,
    optional: true,
  },

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'Email',
    optional: true,
  },

  password: {
    type: String,
    label: "Password",
  },

});

Meteor.users.attachSchema(User.Schema);