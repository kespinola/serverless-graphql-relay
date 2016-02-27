import { Mongo } from 'meteor/mongo';
import ProfileSchema from './schema';

const Profiles = new Mongo.Collection('profiles');

Profiles.attachSchema(ProfileSchema);

export default Profiles;
