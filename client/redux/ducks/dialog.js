import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SHOW = 'dialog/SHOW';
const HIDE = 'dialog/HIDE';

export const showDialog = createAction(SHOW);
export const hideDialog = createAction(HIDE);


const reducer = handleActions({

  [SHOW]: (state, { payload }) => state.setIn([payload, 'open'], true),

  [HIDE]: (state, { payload }) => state.setIn([payload, 'open'], false),

}, new Map());

export default reducer;
