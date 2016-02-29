import { Meteor } from 'meteor/meteor';

export const publishUser = Users => Meteor.publish('user', _id => Users.find({ _id }));

export const publishRoles = Roles => Meteor.publish(null, () => Roles.find({ }));

export const publishProfiles = Profiles => Meteor.publish('profiles', () => Profiles.find({ }));

export const publishProfile =
  Profiles => Meteor.publish('profile', userId => Profiles.find({ userId }));
