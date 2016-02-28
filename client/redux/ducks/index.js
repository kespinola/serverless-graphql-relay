import { combineReducers } from 'redux';
import navigation from './navigation';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

import authReducer from './auth';

export default combineReducers({
  navigation: navigation,
  auth: authReducer,
  routing: routeReducer,
  form: formReducer,
});
