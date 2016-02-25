/* global Meteor */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import Router from './routes.jsx';

import reducer from './redux/ducks';
import appSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware(appSaga);

const reduxRouterMiddleware = syncHistory(browserHistory);

const store = createStore(
  reducer,
  {},
  applyMiddleware(
    createLogger({ collapsed: true }),
    reduxRouterMiddleware,
    sagaMiddleware,
  )
);

reduxRouterMiddleware.listenForReplays(store);

injectTapEventPlugin();

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  );
});
