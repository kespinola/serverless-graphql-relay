const {
  Collection,  
} = Site;

Meteor.publish('site', () => {
  return Collection.findOne({owners: {$in: [this.userId]}});
});

Meteor.publish('sites', () => {
  return Collection.find();
});
