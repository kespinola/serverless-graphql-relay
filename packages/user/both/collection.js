const {
  compose,
} = R;

function getFullName({first_name = '', last_name = ''}){
  return `${first_name}${last_name ? ` ${last_name}` : ''}`;
}

const UserCountry = new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  }
});

User.Schema = new SimpleSchema({
  _id : {
    type: String,
  },
  parent_id: {
    type: String,
  },
  full_name: {
    type: String,
    autoValue: function() {

      const name = {
        first_name: this.field('first_name').value,
        last_name: this.field('last_name').value
      };

      if (this.isInsert || this.isUpdate) {
        return getFullName(name);
      } else {
        this.unset();
      }
    },
    optional: true,
  },
  first_name: {
    type: String,
    optional: true
  },
  last_name: {
    type: String,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  country: {
    type: UserCountry,
    optional: true
  }
});

User.Collection = new Meteor.Collection('profile');

Meteor.users.after.insert((userId, { _id: parent_id }) => {
  User.Collection.insert({parent_id });
});

User.Collection.attachSchema(User.Schema);
