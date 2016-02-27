import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { isEmpty } from 'ramda';

SimpleSchema.debug = true;

const _hasStringField = value => value && !isEmpty(value);
const _getCapFirstLetter = value => value.split('')[0].toUpperCase();
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
  initials: {
    type: String,
    autoValue() {
      const firstName = this.field('firstName').value;
      const lastName = this.field('lastName').value;
      let initials = '';

      if (_hasStringField(firstName)) {
        initials = _getCapFirstLetter(firstName);
      } else {
        return initials;
      }

      if (_hasStringField(lastName)) {
        initials = `${initials} ${_getCapFirstLetter(lastName)}`;
      }

      return initials;
    },
  },
});

export default ProfileSchema;
