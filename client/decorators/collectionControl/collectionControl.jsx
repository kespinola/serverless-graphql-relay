import React from 'react';
import { connect } from 'react-redux';
import collectionDispatchFactory from './../../redux/dispatch/collection';

export default ({ collection, successRedirect }) => Component => {
  const collectionDispatch = collectionDispatchFactory(collection, successRedirect);
  const collectionMergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    collection: { ...stateProps, actions: dispatchProps },
  });

  class CollectionControlComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    () => ({}),
    collectionDispatch,
    collectionMergeProps,
  )(CollectionControlComponent);
};
