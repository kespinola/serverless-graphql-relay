/* global User, Meteor, Roles */

if (Meteor.settings.seed && User.Collection.find().count() === 0) {
  const userId = Meteor.call(
    'insertUser',
    { email: Meteor.settings.seed.email, password: Meteor.settings.seed.pw }
  );
  Roles.addUsersToRoles(userId, 'webmaster');
}
