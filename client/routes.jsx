import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import PassThrough from './components/PassThrough';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Account from './components/Account';
import Users from './components/Users';
import Roles from './components/Roles';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />
      <Route path="account" component={Account} />
      <Route path="admin" component={PassThrough}>
        <IndexRoute component={Users} />
        <Route path="roles" component={Roles} />
      </Route>
    </Route>
  </Router>
);
