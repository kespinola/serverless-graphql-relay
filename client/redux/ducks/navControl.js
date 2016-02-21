import { handleActions, createAction } from 'redux-actions';
import { fromJS } from 'immutable';

const NAV_TOGGLE_DEFAULT = {
  open: false,
};

const TOGGLE_NAV = 'navControl/TOGGLE_NAV';

export const toggleNav = createAction(TOGGLE_NAV);

const reducer = handleActions({
  [TOGGLE_NAV]: state => state.update('open', open => !open),
}, fromJS(NAV_TOGGLE_DEFAULT));

export default reducer;
