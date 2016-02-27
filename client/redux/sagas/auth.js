import { put, fork, take, call } from 'redux-saga/effects';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';
import { SIGN_UP_REQUEST, SIGN_OUT_REQUEST } from './../ducks/auth';

function* signUp({ payload }) {
  yield Accounts.createUser(payload);
  yield put(push('/'));
}

function* signOut() {
  yield Meteor.logout();
  yield put(push('/'));
}

export function* watchSignUpSaga() {
  while(true) {
    yield take(SIGN_UP_REQUEST);
    yield call(signUp);
  }
}

export function* watchSignOutSaga() {
  while(true) {
    yield take(SIGN_OUT_REQUEST);
    yield call(signOut);
  }
}
