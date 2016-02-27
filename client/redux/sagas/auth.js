import { put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';
import { SIGN_UP_REQUEST, SIGN_OUT_REQUEST, SIGN_IN_REQUEST } from './../ducks/auth';

function* signUp({ payload }) {
  yield Accounts.createUser(payload);
  yield put(push('/'));
}

function* signOut() {
  yield Meteor.logout();
  yield put(push('/'));
}

function* signIn({ payload: { email, password } }) {
  yield Meteor.loginWithPassword(email, password);
  yield put(push('/'));
}

function* watchSignUpSaga() {
  while(true) {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
  }
}

function* watchSignOutSaga() {
  while(true) {
    yield takeLatest(SIGN_OUT_REQUEST, signOut);
  }
}

function* watchSignInSaga() {
  while(true) {
    yield takeLatest(SIGN_IN_REQUEST, signIn);
  }
}

function* authSaga() {
  yield [
    fork(watchSignUpSaga),
    fork(watchSignInSaga),
    fork(watchSignOutSaga),
  ];
}
export default authSaga;
