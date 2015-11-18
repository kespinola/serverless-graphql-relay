/* global Meteor, Block */

Meteor.methods({
  addBlock(block) {
    return Block.Collection.insert(block);
  },
  addBlockSection({parentId, pageId}) {
    if(!parentId || !pageId) {
      return new Meteor.Error(
        `missing required key: {parentId: ${parentId}}, pageId: ${pageId}`
      );
    }
    const blockParentId = Block.Collection.insert({parentId, pageId });
    return Meteor.call('addBlock', { parentId: blockParentId, pageId });
  },
  updateBlock(_id, update) {
    return Block.Collection.update(_id, { $set: update });
  },
  removeBlock(_id) {
    Block.Collection.remove({ $or: [{ _id }, { parentId: _id }] })
  },
});
