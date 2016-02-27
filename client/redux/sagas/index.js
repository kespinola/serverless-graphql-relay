import authSaga from './auth';
import collectionSaga from './collection';
import { fork } from 'redux-saga/effects';

export default function* () {
  yield [
    fork(authSaga),
    fork(collectionSaga),
  ];
}
