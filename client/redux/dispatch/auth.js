import { signUpRequest, signOutRequest, signInRequest } from './../ducks/auth';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators(
  { signUpRequest, signOutRequest, signInRequest },
  dispatch
);
