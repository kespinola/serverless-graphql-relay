import React from 'react';
import { ReactMeteorMixin } from 'meteor/react-meteor-data';

export default Component => {
  return React.createClass({

    mixins: [ReactMeteorMixin],

    getMeteorData() {
      return {
        user: { id: 'test', name: 'Test' },
      };
    },

    render() {
      return <Component {...this.data} />;
    },
  });
};
