Meteor.publish('siteByOwner', id => {
  return Site.Collection.findOne({owner: id});
});

Meteor.publish('sites', () => {
  return Site.Collection.find();
});
