import { createSelector, createStructuredSelector } from 'reselect';

const navigationRootSelector = state => state.navigation;

const navOpenSelector = createSelector(
 navigationRootSelector,
 navigation => navigation.get('open')
);

export default createStructuredSelector({
  open: navOpenSelector,
});
