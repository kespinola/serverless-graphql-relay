import { signUpRequest, signOutRequest } from './../ducks/auth';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators({ signUpRequest, signOutRequest }, dispatch);
