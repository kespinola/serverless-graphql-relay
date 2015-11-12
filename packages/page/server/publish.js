Meteor.publish('pageByPath', pathname => Page.Collection.find({pathname}));
Meteor.publish('navFromPages', () => {
  return Page.Collection.find({showInNav: true}, {title: 1, pathname: 1});
});
