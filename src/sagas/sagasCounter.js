import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import {ActionTypesCounter} from '../constants/actionTypes';

//===================================================
// worker saga: will perform the async increment task
function* incrementAsync() {
  console.log('incrementAsync, before yield');
  yield call(delay, 1000);
  yield put({type: ActionTypesCounter.INCREMENT});
} 

// watcher saga: spawn a new incrementAsync task on each
// INCREMENT_ASYNC
export default function* watchIncrementAsync() {
  yield takeEvery(ActionTypesCounter.INCREMENT_ASYNC, incrementAsync);
}

