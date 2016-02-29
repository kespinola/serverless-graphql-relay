import { createSelector, createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
const dialogRootSelector = state => state.dialog;

const dialogSelectorFactor = scope => {
  const scopedStateSelector = createSelector(
    dialogRootSelector,
    state => state.get(scope, new Map())
  );

  const openSelector = createSelector(
    scopedStateSelector,
    state => state.get('open', false)
  );

  return createStructuredSelector({
    open: openSelector,
  });
};

export default dialogSelectorFactor;
