const {
  compose,
} = R;

function getFullName({firstName = '', lastName = ''}) {
  return `${firstName}${lastName ? ` ${lastName}` : ''}`;
}

const UserCountry = new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  },
});

User.Schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
    optional: true,
  },
  fullName: {
    type: String,
    autoValue: function() {
      const name = {
        firstName: this.field('firstName').value,
        lastName: this.field('lastName').value,
      };

      if (this.isInsert || this.isUpdate) {
        return getFullName(name);
      } else {
        this.unset();
      }
    },
    optional: true,
  },
  firstName: {
    type: String,
    defaultValue: '',
  },
  lastName: {
    type: String,
    defaultValue: '',
  },
  birthday: {
    type: Date,
    optional: true,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bio: {
    type: String,
    optional: true,
  },
  country: {
    type: UserCountry,
    optional: true,
  },
});

User.Collection = new Meteor.Collection('profiles');

User.Collection.attachSchema(User.Schema);

User.Collection.allow({
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
