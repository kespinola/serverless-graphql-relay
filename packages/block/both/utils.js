function joinBlocks(doc) {
  doc.blocks = Block.Collection.find({ parentId: doc._id }).fetch();
  return doc;
}

Block.Methods = {
  joinBlocks
}
