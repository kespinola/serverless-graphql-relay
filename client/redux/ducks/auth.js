import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
const SIGN_UP_RESOLVE = 'auth/SIGN_UP_RESOLVE';

export const signUpResolve = createAction(SIGN_UP_RESOLVE);

const reducer = handleActions({
  [SIGN_UP_RESOLVE]: (state, {payload}) => {
    debugger;
    return state;
  },
}, new Map());

export default reducer;
