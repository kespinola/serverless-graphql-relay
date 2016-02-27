import { Meteor } from 'meteor/meteor';
import Profiles from './collections/profiles';
import { Accounts } from 'meteor/accounts-base';

if(Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    Profiles.insert({ userId: user._id });
    return user;
  });
}
