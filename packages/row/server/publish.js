/* global Meteor, Row */
Meteor.publish('rowById', _id => {
  return Row.Collection.find({ _id });
});
Meteor.publish('rowByParentId', _id => {
  return Row.Collection.find({parentId: _id});
});
Meteor.publish('rowByPageId', _id => {
  return Row.Collection.find({pageId: _id});
});
