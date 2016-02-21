import { toggleNav } from './../ducks/navControl';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators({ toggleNav }, dispatch);
