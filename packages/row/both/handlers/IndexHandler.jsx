/* global Meteor, React, Row, ReactMeteorData, */

Row.Handlers.Index = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    params: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const {
      params: { rowId: _id },
    } = this.props;
    const docHandler = Meteor.subscribe('rowById', _id);
    return {
      docReady: docHandler.ready(),
      doc: Row.Collection.findOne({ _id }),
    };
  },
  render() {
    const { doc } = this.data;
    return React.cloneElement(this.props.children, { doc });
  },
});
