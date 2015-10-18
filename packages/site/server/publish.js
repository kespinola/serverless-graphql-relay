Meteor.publish('sites', () => {
  return Site.Collection.find();
});
