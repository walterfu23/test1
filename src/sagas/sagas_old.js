import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import {ActionTypesCounter, ActionTypesBizDoc} from '../constants/actionTypes';
import Api from '../apis/Api';

function* helloSaga() {
  console.log('Hello Sagas!');
}

//===================================================
// worker saga: will perform the async increment task
function* incrementAsync() {
  console.log('incrementAsync, before yield');
  yield call(delay, 1000);
  yield put({type: ActionTypesCounter.INCREMENT});
} 

// watcher saga: spawn a new incrementAsync task on each
// INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery(ActionTypesCounter.INCREMENT_ASYNC, incrementAsync);
}

//===================================================
export function* fetchData(action) {
  try {
      const data = yield call(Api.getBizDocs);
      yield put({type: ActionTypesBizDoc.FETCH_BizDoc_SUCCESSFUL, data});
  } catch (error) {
      const i = 123;
      yield put({type: ActionTypesBizDoc.FETCH_BizDoc_FAILED, error});
  }
} 

function * watchFetchData() {
  yield takeEvery(ActionTypesBizDoc.FETCH_BizDoc_REQUESTED, fetchData);
}

//===================================================
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData()
  ]);
}
