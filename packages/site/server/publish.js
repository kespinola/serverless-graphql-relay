Meteor.publish('siteByDomain', (domain) =>{
  return Site.Collection.find({domain});  
});

Meteor.publish('sites', () => {
  return Site.Collection.find();
});
