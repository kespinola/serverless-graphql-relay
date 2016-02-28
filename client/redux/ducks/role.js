import { createAction } from 'redux-actions';

export const CREATE_ROLE = 'role/CREATE';
export const DELETE_ROLE = 'role/DELETE';

export const createRole = createAction(CREATE_ROLE);
export const deleteRole = createAction(DELETE_ROLE);
