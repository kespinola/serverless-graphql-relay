import { toggleNav, changeRoute } from './../ducks/navigation';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators({ toggleNav, changeRoute }, dispatch);
