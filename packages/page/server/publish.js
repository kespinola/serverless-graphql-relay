Meteor.publish('pageByPathname', pathname => Page.Collection.find({pathname}));
