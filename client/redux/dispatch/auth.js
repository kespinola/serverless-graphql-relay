import { signUpRequest } from './../ducks/auth';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators({ signUpRequest }, dispatch);
