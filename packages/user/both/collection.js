const {
  compose,
} = R;

function getFullName({first_name = '', last_name = ''}){
  return `${first_name}${last_name ? ` ${last_name}` : ''}`;
}

Schema = {};

Schema.UserCountry = new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  }
});

Schema.UserProfile = new SimpleSchema({
  full_name: {
    type: String,
    autoValue: function() {
      
      const name = {
        first_name: this.field('profile.first_name').value, 
        last_name: this.field('profile.last_name').value
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
    type: Schema.UserCountry,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true,
  },
});

Meteor.users.attachSchema(Schema.User);

