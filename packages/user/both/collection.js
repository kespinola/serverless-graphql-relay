const {
  compose,
} = R;

function getFullName({first_name, last_name}){
  if(!first_name) return '';
  
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
    autoValue: () => {
      console.log(this.fields('profile'), 'autoValue full_name', getFullName(this.fields('profile')));
      if (this.isInsert) {
        return getFullName(this.field('profile'));
      } else if (this.isUpsert) {
        return {$setOnInsert: getFullName(this.field('profile'))};
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
    type: Object,
    optional: true,
    blackbox: true
  },
});

Meteor.users.attachSchema(Schema.User);

