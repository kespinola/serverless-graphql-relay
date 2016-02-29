import {
  createRole,
  deleteRole,
  updateRoles,
  toggleInRole,
  cancelRoleUpdate,
} from './../ducks/role';
import { bindActionCreators } from 'redux';

export default dispatch => ({
  createRole: name => dispatch(createRole(name)),
  deleteRole: name => dispatch(deleteRole(name)),
  updateRoles: _id => dispatch(updateRoles(_id)),
  cancelRoleUpdate: () => dispatch(cancelRoleUpdate()),
  toggleInRole: (userId, name) => dispatch(toggleInRole({ userId, name })),
});
