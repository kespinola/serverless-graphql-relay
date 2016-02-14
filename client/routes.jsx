import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import CatchAll from './components/CatchAll';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={CatchAll} />
    </Route>
  </Router>
);
