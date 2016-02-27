import { combineReducers } from 'redux';
import navControlReducer from './navControl';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

import authReducer from './auth';
export watchSignUpSaga from './auth';

export default combineReducers({
  navControl: navControlReducer,
  auth: authReducer,
  routing: routeReducer,
  form: formReducer,
});
