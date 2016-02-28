import { Meteor } from 'meteor/meteor';
import Profiles from './collections/profiles';
import { Accounts } from 'meteor/accounts-base';

Meteor.roles.allow({
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

if(Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    Profiles.insert({ userId: user._id });
    return user;
  });
}
