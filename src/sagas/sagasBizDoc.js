import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
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
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchCreateBizDoc() {
  yield takeEvery(actionBizDoc.CREATE_BizDoc_REQUESTED, createBizDoc);
}

function* createBizDoc(action) {
  try {
    yield put(actionError.clearStateError);
    const data = yield call(Api.createBizDoc, action.payload);
    //    yield put({ type: ActionTypesBizDoc.CREATE_BizDoc_SUCCESSFUL, data });
    yield put(actionGen(actionBizDoc.CREATE_BizDoc_SUCCESSFUL, data));
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchDeleteBizDoc() {
  yield takeEvery(actionBizDoc.DELETE_BizDoc_REQUESTED, deleteBizDoc);
}

function* deleteBizDoc(action) {
  try {
    yield call(Api.deleteBizDoc, action.payload);
    yield put(actionGen(actionBizDoc.DELETE_BizDoc_SUCCESSFUL, action.payload));
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchUpdateBizDoc() {
  yield takeEvery(actionBizDoc.UPDATE_BizDoc_REQUESTED, updateBizDoc);
}

function* updateBizDoc(action) {
  try {
    const rec = yield call(Api.updateBizDocPrep, action.payload);
    yield call(Api.updateBizDoc, rec);
    yield put(actionGen(actionBizDoc.UPDATE_BizDoc_SUCCESSFUL, rec));
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}


//==================================================================
