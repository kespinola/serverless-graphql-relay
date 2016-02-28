import { put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeEvery } from 'redux-saga';
import { CREATE_ROLE, DELETE_ROLE } from './../ducks/role';
import { Roles } from 'meteor/alanning:roles';

function* createRole({ payload }) {
  yield Roles.createRole(payload);
}

function* watchCreateRole() {
  while(true) {
    yield takeEvery(CREATE_ROLE, createRole);
  }
}

function* deleteRole({ payload }) {
  yield Roles.deleteRole(payload);
  yield put(push('/roles'));
}

function* watchDeleteRole() {
  while(true) {
    yield takeEvery(DELETE_ROLE, deleteRole);
  }
}

function* roleSaga() {
  yield [
    fork(watchCreateRole),
    fork(watchDeleteRole),
  ];
}

export default roleSaga;
