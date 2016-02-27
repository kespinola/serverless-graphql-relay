import { Meteor } from 'meteor/meteor';
import Profiles from './../../../both/collections/profiles';
import React from 'react';
import meteorData from './../meteorData';

export default Component => {
  class UserInfoComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return meteorData(
    () => ({ user: Profiles.findOne({ userId: Meteor.userId() }) || {} }),
    UserInfoComponent
  );
};
