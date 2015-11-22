/* global Meteor, Page, React, Flexgrid, Column, ReactMeteorData */
const { Row: FlexRow, Col: FlexCol } = Flexgrid;

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
      <FlexCol {... grid} style={styles}>
        {_id}
        {this.props.children}
        {rows && rows.map(({ _id, ... restRow }) => {
          debugger;
          return <PageRow key={_id} _id={_id} {... restRow} />;
        })}
      </FlexCol>
    );
  },
});

const PageRow = React.createClass({

  propTypes: {
    _id: React.PropTypes.string,
    grid: React.PropTypes.object,
    styles: React.PropTypes.object,
    children: React.PropTypes.node,
  },

  mixins: [ ReactMeteorData ],

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
      <FlexRow {... grid} style={styles}>
        {columns && columns.map(({ _id, ... restCol }) => {
          return <PageCol key={_id} _id={_id} {... restCol} />;
        })}
      </FlexRow>
    );
  },
});

Page.Component.PageRow = PageRow;
Page.Component.PageCol = PageCol;
