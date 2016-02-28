import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import dialogReducer from './dialog';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

import authReducer from './auth';

export default combineReducers({
  dialog: dialogReducer,
  navigation: navigationReducer,
  auth: authReducer,
  routing: routeReducer,
  form: formReducer,
});
