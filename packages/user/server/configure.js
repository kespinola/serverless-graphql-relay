ServiceConfiguration.configurations.remove({
  service: 'facebook'
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: Meteor.settings.private.facebookAppId,
  secret: Meteor.settings.private.facebookSecret,
});