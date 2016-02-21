import authSaga from './auth';
import { fork } from 'redux-saga/effects';

export default function* () {
  yield fork(authSaga);
}
