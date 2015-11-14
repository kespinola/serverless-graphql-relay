/* global Meteor, Block */
Meteor.publish('blocks', () => Block.Collection.find({}));
Meteor.publish('blockById', _id => Block.COllection.findOne({_id}));
