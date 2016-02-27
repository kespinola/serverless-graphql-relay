import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const UPDATE = 'collection/UPDATE';

export const updateCollection = createAction(UPDATE);

const reducer = handleActions({}, new Map());

export default reducer;
