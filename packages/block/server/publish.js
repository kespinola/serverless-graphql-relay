/* global Meteor, Block */
Meteor.publish('blocks', () => Block.Collection.find({}));
Meteor.publish('blockByParentId', parentId => Block.Collection.find({parentId}));
Meteor.publish('blockByPageId', pageId => Block.Collection.find({pageId}));
Meteor.publish('blockById', _id => Block.Collection.find({_id}));
