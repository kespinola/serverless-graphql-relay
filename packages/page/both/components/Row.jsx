/* global Meteor, Page, React, Flexgrid, Column, ReactMeteorData */
const { Row } = Flexgrid;
const { Component: { Column: PageCol } } = Page;

Page.Component.Row = React.createClass({

  propTypes: {
    _id: React.PropTypes.string,
    grid: React.PropTypes.object,
    styles: React.PropTypes.object,
    children: React.PropTypes.node,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const rowId = this.props._id;
    const columnHandler = Meteor.subscribe('columnByParentId', rowId);

    return {
      isReady: columnHandler.ready(),
      columns: Column.Collection.find({ parentId: rowId }).fetch(),
    };
  },

  render() {
    const { columns } = this.data;
    const { grid, styles } = this.props;
    return (
      <Row {... grid} style={styles}>
        {columns && columns.map(({ _id, ... restCol }) => {
          return <PageCol key={_id} _id={_id} {... restCol} />;
        })}
      </Row>
    );
  },
});
