import { take, put } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, signUpResolve } from './../ducks/auth';

function* signUp({ payload: { email, password } }) {
  const user = yield Account.createUser({ email, password });
  yield put(signUpResolve(user));
}

function* watchSignUpSaga() {
  yield take(SIGN_UP_REQUEST, signUp);
}

export default watchSignUpSaga;
