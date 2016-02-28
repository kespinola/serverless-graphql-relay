import { put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { CREATE_ROLE } from './../ducks/role';
import { Roles } from 'meteor/alanning:roles';

function* createRole({ payload }) {
  yield Roles.createRole(payload);
}

function* watchCreateRole() {
  while(true) {
    yield takeEvery(CREATE_ROLE, createRole);
  }
}

function* roleSaga() {
  yield [
    fork(watchCreateRole),
  ];
}

export default roleSaga;
