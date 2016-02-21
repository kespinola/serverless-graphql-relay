import React from 'react';
import { connect } from 'react-redux';
import navControlDispatch from './../../redux/dispatch/navControl';
import navControlSelector from './../../redux/selectors/navControl';

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
