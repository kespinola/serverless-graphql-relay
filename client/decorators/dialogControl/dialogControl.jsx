import React from 'react';
import { connect } from 'react-redux';
import dialogDispatchFactory from './../../redux/dispatch/dialog';
import dialogSelectorFactory from './../../redux/selectors/dialog';

export default scope => Component => {
  const dialogDispatch = dialogDispatchFactory(scope);
  const dialogSelector = dialogSelectorFactory(scope);
  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    dialog: { ...stateProps, actions: dispatchProps },
  });

  class DialogControlComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    dialogSelector,
    dialogDispatch,
    mergeProps,
  )(DialogControlComponent);
};
