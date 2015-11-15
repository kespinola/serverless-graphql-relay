/* global Meteor, Block */

Meteor.methods({
  addBlock(block) {
    return Block.Collection.insert(block);
  },
  updateBlock(_id, update) {
    return Block.Collection.update(_id, { $set: update });
  },
});
