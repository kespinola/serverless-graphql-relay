Meteor.methods({
  loginWithSocial: (method, options = {}) => {
    Meteor[`loginWith${method}`](options, err => {
      throw new Meteor.Error(`${method} failed`);
    });
  },
});