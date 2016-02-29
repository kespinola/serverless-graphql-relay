import { put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeEvery } from 'redux-saga';
import { CREATE_ROLE, DELETE_ROLE, TOGGLE_USER } from './../ducks/role';
import { Roles } from 'meteor/alanning:roles';

function* createRole({ payload }) {
  yield Roles.createRole(payload);
}

function* deleteRole({ payload }) {
  yield Roles.deleteRole(payload);
  yield put(push('/roles'));
}

function* toggleUserInRole({ payload: { userId, name } }) {
  const inRole = Roles.userIsInRole(userId, name);

  if (inRole) {
    yield Roles.removeUsersFromRoles(userId, name);
  } else {
    debugger;
    yield Roles.addUsersToRoles(userId, name);
  }
}

function* watchCreateRole() {
  while(true) {
    yield takeEvery(CREATE_ROLE, createRole);
  }
}

function* watchDeleteRole() {
  while(true) {
    yield takeEvery(DELETE_ROLE, deleteRole);
  }
}

function* watchToggleUserInRole() {
  while(true) {
    yield takeEvery(TOGGLE_USER, toggleUserInRole);
  }
}

function* roleSaga() {
  yield [
    fork(watchCreateRole),
    fork(watchDeleteRole),
    fork(watchToggleUserInRole),
  ];
}

export default roleSaga;
