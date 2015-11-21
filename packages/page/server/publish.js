/* global Meteor, Page, Row, Column */
Meteor.publish('pageByPath', pathname => Page.Collection.find({pathname}));
Meteor.publish('navFromPages', () => {
  return Page.Collection.find({showInNav: true}, {title: 1, pathname: 1});
});

Meteor.publish('elementsByPageId', pageId => {
  const selector = { pageId };
  return [
    Row.Collection.find(selector),
    Column.Collection.find(selector),
  ];
});
