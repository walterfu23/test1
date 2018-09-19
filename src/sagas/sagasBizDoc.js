import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionBizDoc from '../actions/actionBizDoc';
import Api from '../apis/Api';

//==================================================================
export function* watchFetchBizDocs() {
  yield takeEvery(actionBizDoc.FETCH_BizDoc_REQUESTED, fetchBizDocs);
}

function* fetchBizDocs(action) {
  try {
    const data = yield call(Api.getBizDocs);
//    yield put({ type: ActionTypesBizDoc.FETCH_BizDoc_SUCCESSFUL, data });
    yield put(actionGen(actionBizDoc.FETCH_BizDoc_SUCCESSFUL, data));
  } catch (error) {
//    yield put({ type: ActionTypesBizDoc.FETCH_BizDoc_FAILED, error });
    yield put(actionGen(actionBizDoc.FETCH_BizDoc_FAILED, error));
  }
}

//==================================================================
export function* watchCreateBizDoc() {
  yield takeEvery(actionBizDoc.CREATE_BizDoc_REQUESTED, createBizDoc);
}

function* createBizDoc(action) {
  try {
    console.log('createBizDoc', action);
    const data = yield call(Api.createBizDoc, action.payload);
//    yield put({ type: ActionTypesBizDoc.CREATE_BizDoc_SUCCESSFUL, data });
    yield put(actionGen(actionBizDoc.CREATE_BizDoc_SUCCESSFUL, data));
  } catch (error) {
    yield put(actionGen(actionBizDoc.CREATE_BizDoc_FAILED, error));
  }
}

//==================================================================
