import { Meteor } from 'meteor/meteor';
import Profiles from './../../both/collections/profiles';
import {
  publishUser,
  publishProfile,
  publishProfiles,
  publishRoles,
} from './user';

publishUser(Meteor.users);
publishProfiles(Profiles);
publishProfile(Profiles);
publishRoles(Meteor.roles);
