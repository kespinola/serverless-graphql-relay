import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import dialogReducer from './dialog';
import roleReducer from './role';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

import authReducer from './auth';

export default combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  form: formReducer,
  navigation: navigationReducer,
  role: roleReducer,
  routing: routeReducer,
});
