import React from 'react';
import { connect } from 'react-redux';
import navControlDispatch from './../../redux/dispatch/navigation';
import navControlSelector from './../../redux/selectors/navigation';

const navControlMergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  navControls: { ...stateProps, actions: dispatchProps },
});

const navControl = Component => connect(
  navControlSelector,
  navControlDispatch,
  navControlMergeProps,
)(Component);

export default navControl;
