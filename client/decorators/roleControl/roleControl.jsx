import React from 'react';
import { connect } from 'react-redux';
import roleDispatch from './../../redux/dispatch/role';

export default Component => {
  const roleMergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    role: { ...stateProps, actions: dispatchProps },
  });

  class RoleControlComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    () => ({}),
    roleDispatch,
    roleMergeProps,
  )(RoleControlComponent);
};
