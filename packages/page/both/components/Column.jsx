/* global Meteor, React, Flexgrid, Column, Row, Page, ReactMeteorData */
const { Col } = Flexgrid;
const { Component: PageRow } = Page;

const PageCol = React.createClass({

  propTypes: {
    _id: React.PropTypes.string,
    grid: React.PropTypes.object,
    styles: React.PropTypes.object,
    children: React.PropTypes.node,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const columnId = this.props._id;
    const rowHandler = Meteor.subscribe('rowByParentId', columnId);
    return {
      isReady: rowHandler.ready(),
      rows: Row.Collection.find({ parentId: columnId }).fetch(),
    };
  },

  render() {
    const { rows } = this.data;
    const { grid, styles, _id } = this.props;
    return (
      <Col {... grid} style={styles}>
        {_id}
        {this.props.children}
        {rows && rows.map(({ _id, ... restRow }) => {
          return <PageRow key={_id} _id={_id} {... restRow} />;
        })}
      </Col>
    );
  },
});

Page.Component.Column = PageCol;
