import { createSelector, createStructuredSelector } from 'reselect';

const roleRootSelector = state => state.role;

const changeRoleSelector = createSelector(
  roleRootSelector,
  role => role.get('changeRole', false)
);

export default createStructuredSelector({
  changeRole: changeRoleSelector,
});
