const { compose } = R;

function getFullName(firstName = '', lastName = '') {
  return `${firstName}${lastName ? ` ${lastName}` : ''}`;
}

const UserCountry = new SimpleSchema({
  name: {
    type: String,
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/,
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
    autoValue() {
      if (this.isInsert || this.isUpdate) {
        console.log(this.field('firstName').value, this.field('lastName').field);
        return getFullName(this.field('firstName').value, this.field('lastName').field);
      } else {
        this.unset();
      }
    },
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

User.Collection.after.remove((userId, { parentId: _id }) => Meteor.users.remove({_id}));

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
