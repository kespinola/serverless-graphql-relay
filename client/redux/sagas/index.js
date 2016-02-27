import { watchSignUpSaga, watchSignOutSaga } from './auth';
import { fork } from 'redux-saga/effects';

export default function* () {
  yield [
    fork(watchSignUpSaga),
    fork(watchSignOutSaga),
  ];
}
