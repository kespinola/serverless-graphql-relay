import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
const SIGN_UP_RESOLVE = 'auth/SIGN_UP_RESOLVE';
export const SIGN_OUT_REQUEST = 'auth/SIGN_OUT_REQUEST';
export const SIGN_IN_REQUEST = 'auth/SIGN_IN_REQUEST';

export const signUpResolve = createAction(SIGN_UP_RESOLVE);
export const signUpRequest = createAction(SIGN_UP_REQUEST);
export const signOutRequest = createAction(SIGN_OUT_REQUEST);
export const signInRequest = createAction(SIGN_IN_REQUEST);

const reducer = handleActions({}, new Map());

export default reducer;
