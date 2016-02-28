import authSaga from './auth';
import collectionSaga from './collection';
import navigationSaga from './navigation';
import { fork } from 'redux-saga/effects';

export default function* () {
  yield [
    fork(navigationSaga),
    fork(authSaga),
    fork(collectionSaga),
  ];
}
