ServiceConfiguration.configurations.remove({
  service: 'facebook'
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: Meteor.settings.private.facebookAppId,
  secret: Meteor.settings.private.facebookSecret,
});

ServiceConfiguration.configurations.remove({
  service: 'google'
});

ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: Meteor.settings.private.googleId,
  secret: Meteor.settings.private.googleSecret,
});