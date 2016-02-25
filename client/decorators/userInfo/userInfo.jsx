import { Meteor } from 'meteor/meteor';
import React from 'react';
import meteorData from './../meteorData';

export default Component => {
  class UserInfoComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return meteorData(
    () => ({ user: Meteor.user() }),
    UserInfoComponent
  );
};
