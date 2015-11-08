Meteor.methods({
  currentSiteId() {
    const domain = Meteor.settings.public.domain;
    const { _id } = Site.Collection.findOne({ domain }, { _id: 1});
    return _id;
  },
});
