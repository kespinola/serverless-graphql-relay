import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default store => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="sign-in" component={SignIn} />
        <Route path="sign-up" component={SignUp} />
      </Route>
    </Router>
  </Provider>
);
