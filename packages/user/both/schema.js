User.Schema = new SimpleSchema({

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  password: {
    type: String,
    label: "Enter a password",
    min: 8
  },

  confirmPassword: {
    type: String,
    label: "Enter the password again",
    min: 8,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return "passwordMismatch";
      }
    }
  }

});

Meteor.users.attachSchema(User.Schema);