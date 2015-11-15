/* global Meteor, Block */
Meteor.publish('blocks', () => Block.Collection.find({}));
Meteor.publish('blockById', _id => Block.Collection.find({_id}));
