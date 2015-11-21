/* global Meteor, Column */
Meteor.publish('columnById', _id => {
  return Column.Collection.find({ _id });
});

Meteor.publish('columnByParentId', _id => {
  return Column.Collection.find({parentId: _id});
});

Meteor.publish('columnByPageId', _id => {
  return Column.Collection.find({pageId: _id});
});
