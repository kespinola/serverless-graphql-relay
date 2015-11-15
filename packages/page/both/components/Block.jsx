/* global Page, React, Session */

function Block(props) {
  const {
    _id,
    onClick,
    componentClass: ComponentClass = 'div',
  } = props;
  return (
    <ComponentClass onClick={onClick}>
      {_id}
    </ComponentClass>
  );
}

Page.Components.Block = Block;
