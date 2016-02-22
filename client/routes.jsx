import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />
    </Route>
  </Router>
);
