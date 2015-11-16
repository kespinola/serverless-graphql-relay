/* global Page, React, Session, Flexgrid */

const { Row, Col } = Flexgrid;

function Block(props) {
  const {
    _id,
    onClick,
    grid,
    blocks,
    isEditing,
    hasChildren,
    ... restProps,
  } = props;
  const ComponentClass = hasChildren ? Row : Col;
  return (
    <ComponentClass
      {... restProps}
      {... grid}
    >
      {_id}
      {hasChildren && blocks.map(({_id: blockId, blocks = [], grid, ... restBlock}) => {
        return (
          <Block
            key={blockId}
            _id={blockId}
            hasChildren={blocks.length > 0}
            blocks={blocks}
            isEditing={isEditing}
            {... restBlock}
          />
        );
      })}
    </ComponentClass>
  );
}

Block.defaultProps = {
  blocks: [],
};

Block.propTypes = {
  _id: React.PropTypes.string,
  blocks: React.PropTypes.array,
  hasChildren: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  isEditing: React.PropTypes.bool,
  grid: React.PropTypes.object,
  history: React.PropTypes.object,
};

Page.Components.Block = Block;
