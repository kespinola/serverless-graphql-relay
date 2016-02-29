import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const CREATE_ROLE = 'role/CREATE';
export const DELETE_ROLE = 'role/DELETE';
export const TOGGLE_USER = 'role/TOGGLE_USER';
const UPDATE_ROLE = 'role/UPDATE_ROLE';
const CANCEL_ROLE = 'role/CANCEL_ROLE';

export const createRole = createAction(CREATE_ROLE);
export const deleteRole = createAction(DELETE_ROLE);
export const updateRoles = createAction(UPDATE_ROLE);
export const toggleInRole = createAction(TOGGLE_USER);
export const cancelRoleUpdate = createAction(CANCEL_ROLE);

const reducer = handleActions({

  [UPDATE_ROLE]: (state, { payload }) => state.set('changeRole', payload),

  [CANCEL_ROLE]: state => state.set('changeRole', false),

}, new Map({
  changeRole: null,
}));

export default reducer;
