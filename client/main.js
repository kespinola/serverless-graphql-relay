import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './redux/ducks';
import appSaga from './redux/sagas';
import createRouter from './routes.jsx';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware(appSaga);

const store = createStore(
  reducer,
  {},
  applyMiddleware(
    createLogger(),
    sagaMiddleware,
  )
);

const Router = createRouter(store);

Meteor.startup(() => {
  render(Router, document.getElementById('root'));
});
