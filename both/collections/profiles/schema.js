import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { isEmpty } from 'ramda';

const _hasStringField = value => value && !isEmpty(value);

const _firstLetter = value => value.split('')[0].toUpperCase();

const ProfileSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    max: 50,
    optional: true,
  },
  fullName: {
    type: String,
    autoValue() {
      const firstName = this.field('firstName').value;
      const lastName = this.field('lastName').value;
      let fullName = '';

      if (_hasStringField(firstName)) {
        fullName = firstName;
      } else {
        return fullName;
      }

      if (_hasStringField(lastName)) {
        fullName = `${fullName} ${lastName}`;
      }

      return fullName;
    },
  },
  initials: {
    type: String,
    autoValue() {
      const firstName = this.field('firstName').value;
      const lastName = this.field('lastName').value;
      let initials = '';

      if (_hasStringField(firstName)) {
        initials = _firstLetter(firstName);
      } else {
        return initials;
      }

      if (_hasStringField(lastName)) {
        initials = `${initials} ${_firstLetter(lastName)}`;
      }

      return initials;
    },
  },
});

export default ProfileSchema;
