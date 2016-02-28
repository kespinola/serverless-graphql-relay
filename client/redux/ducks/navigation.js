import { handleActions, createAction } from 'redux-actions';
import { fromJS } from 'immutable';

const NAV_TOGGLE_DEFAULT = {
  open: false,
};

export const TOGGLE_NAV = 'navigation/TOGGLE_NAV';
export const CHANGE_ROUTE = 'navigation/CHANGE_ROUTE';

export const toggleNav = createAction(TOGGLE_NAV);
export const changeRoute = createAction(CHANGE_ROUTE);

const reducer = handleActions({
  [TOGGLE_NAV]: state => state.update('open', open => !open),
}, fromJS(NAV_TOGGLE_DEFAULT));

export default reducer;
