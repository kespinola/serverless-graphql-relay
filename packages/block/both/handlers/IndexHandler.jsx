/* global Meteor, React, Block, ReactMeteorData, */

Block.Handlers.Index = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    params: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const {
      params: {blockId: _id},
    } = this.props;
    const blockHandler = Meteor.subscribe('blockByParentId', _id);
    const docHandler = Meteor.subscribe('blockById', _id);
    return {
      docReady: docHandler.ready(),
      doc: Block.Collection.findOne({_id}),
    };
  },
  render() {
    const { doc } = this.data;
    return React.cloneElement(this.props.children, { doc });
  },
});
