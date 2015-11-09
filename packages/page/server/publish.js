Meteor.publish('pageByPathname', pathname => Page.Collection.find({pathname}));
Meteor.publish('pageShowNav', () => {
  return Page.Collection.find({showInNav: true}, {title: 1, pathname: 1});
});
