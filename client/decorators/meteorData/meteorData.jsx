import React from 'react';
import { curry } from 'ramda';
import { TrackerReact } from 'meteor/ultimatejs:tracker-react';

const meteorData = (getMeteorData, Component) => React.createClass({

  mixins: [TrackerReact],

  render() {
    const data = getMeteorData(this.props);
    return <Component {...this.props} {...data} />;
  },

});

export default curry(meteorData);
