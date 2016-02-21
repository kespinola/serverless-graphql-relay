import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import reducer from './redux/ducks';
import appSaga from './redux/sagas';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const sagaMiddleware = createSagaMiddleware(appSaga);

const reduxRouterMiddleware = syncHistory(browserHistory);

const store = createStore(
  reducer,
  {},
  applyMiddleware(
    createLogger(),
    reduxRouterMiddleware,
    sagaMiddleware,
  )
);

reduxRouterMiddleware.listenForReplays(store);

export default (
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
