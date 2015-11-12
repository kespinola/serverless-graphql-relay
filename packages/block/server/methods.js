/* global Meteor, Block */

Meteor.methods({
  addBlock(block) {
    return Block.Collection.insert(block);
  },
});
