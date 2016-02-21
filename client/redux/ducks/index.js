import { combineReducers } from 'redux';
import navControlReducer from './navControl';

import authReducer from './auth';
export watchSignUpSaga from './auth';

export default combineReducers({
  navControl: navControlReducer,
  auth: authReducer,
});
