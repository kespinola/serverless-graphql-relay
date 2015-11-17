/* global Meteor, Page, React, Session, Flexgrid, ReactMeteorData */

const { Row, Col } = Flexgrid;

const PageBlock = React.createClass({

  propTypes: {
    _id: React.PropTypes.string,
    grid: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const { _id } = this.props;
    const blockHandler = Meteor.subscribe('blockByParentId', _id);
    const children = Block.Collection.find({parentId: _id}).fetch();
    const hasChildren = children.length > 0;

    return {
      children,
      hasChildren,
      componentClass: hasChildren ? Row : Col,
      isReady: blockHandler.ready(),
    };
  },

  render() {
    const {
      children,
      hasChildren,
      componentClass: ComponentClass
    } = this.data;
    const {
      _id,
      onClick,
      grid,
      isEditing,
      ... restProps,
    } = this.props;
    return (
      <ComponentClass
        {... restProps}
        {... grid}
      >
      {hasChildren ? children.map(({_id: blockId, ... restBlock}) => {
        return (
          <PageBlock
            key={blockId}
            _id={blockId}
            isEditing={isEditing}
            {... restBlock}
          />
        );
      }) : (
        _id
      )}
      </ComponentClass>
    );
  },
});

Page.Components.Block = PageBlock;
