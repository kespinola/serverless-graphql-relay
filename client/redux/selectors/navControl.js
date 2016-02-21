import { createSelector, createStructuredSelector } from 'reselect';

const navControlRootSelector = state => state.navControl;

const navOpenSelector = createSelector(
 navControlRootSelector,
 navControl => navControl.get('open')
);

export default createStructuredSelector({
  open: navOpenSelector,
});
