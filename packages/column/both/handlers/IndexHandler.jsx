/* global Meteor, React, Column, ReactMeteorData, */

Column.Handlers.Index = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    params: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const {
      params: {columnId: _id},
    } = this.props;
    const docHandler = Meteor.subscribe('columnById', _id);
    return {
      docReady: docHandler.ready(),
      doc: Column.Collection.findOne({ _id }),
    };
  },
  render() {
    const { doc } = this.data;
    return React.cloneElement(this.props.children, { doc });
  },
});
