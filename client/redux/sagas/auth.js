import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { SIGN_UP_REQUEST, signUpResolve } from './../ducks/auth';

function* signUp({ payload }) {
  const user = yield Accounts.createUser(payload);
  yield put(signUpResolve(user));
}

function* watchSignUpSaga() {
  while(true) {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
  }
}

export default watchSignUpSaga;
