/* global Meteor */

import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';

import Router from './routes.jsx';

injectTapEventPlugin();


Meteor.startup(() => {
  render(Router, document.getElementById('root'));
});
