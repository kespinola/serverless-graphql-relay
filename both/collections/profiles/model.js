import { Mongo } from 'meteor/mongo';
import ProfileSchema from './schema';

const Profiles = new Mongo.Collection('profiles');

const isOwner = (userId, ownerId) => userId === ownerId;

Profiles.allow({
  insert() {
    return true;
  },
  update(user, { userId }) {
    return isOwner(userId, user);
  },
  remove(user, { userId }) {
    return isOwner(userId, user);
  },
});

Profiles.attachSchema(ProfileSchema);

export default Profiles;
