import { put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { push } from 'react-router-redux';
import { UPDATE } from './../ducks/collection';

function* update({ payload: { collection, update, selector, successRedirect } }) {
  yield collection.update(selector, { $set: update });
  if(successRedirect) { yield put(push(successRedirect)); }
}

function* watchUpdateCollection() {
  while(true) {
    yield takeEvery(UPDATE, update);
  }
}

function* collectionSaga() {
  yield [
    fork(watchUpdateCollection),
  ];
}

export default collectionSaga;
