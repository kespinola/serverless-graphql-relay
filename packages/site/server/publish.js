Meteor.publish('siteByOwner', id => {
  console.log(id,'id from site', Site.Collection.findOne({owner: id}));
  return Site.Collection.findOne({owner: id});
});

Meteor.publish('sites', () => {
  return Site.Collection.find();
});
