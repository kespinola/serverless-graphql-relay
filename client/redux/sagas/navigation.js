import { put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { push } from 'react-router-redux';
import { CHANGE_ROUTE, toggleNav } from './../ducks/navigation';

function* changeRoute({ payload }) {
  yield put(push(payload));
  yield put(toggleNav());
}

function* watchRouteChange() {
  while(true) {
    yield takeEvery(CHANGE_ROUTE, changeRoute);
  }
}

function* navigationSaga() {
  yield [
    fork(watchRouteChange),
  ];
}

export default navigationSaga;
