import React from 'react';
import { connect } from 'react-redux';
import authDispatch from './../../redux/dispatch/auth';

export default Component => {
  const authMergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    auth: { ...stateProps, actions: dispatchProps },
  });

  class AuthControlComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    () => ({}),
    authDispatch,
    authMergeProps,
  )(AuthControlComponent);
};
