/* global Page, React, Session */

function PageBlock(props) {
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

Page.Components.Block = PageBlock;
