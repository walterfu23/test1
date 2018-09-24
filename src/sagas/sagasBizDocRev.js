import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionBizDocRev from '../actions/actionBizDocRev';
import Api from '../apis/Api';

//==================================================================
export function* watchFetchBizDocRevs() {
  yield takeEvery(actionBizDocRev.FETCH_BizDocRev_REQUESTED, fetchBizDocRevs);
}

function* fetchBizDocRevs(action) {
  try {
    yield put(actionControl.setShowLoadingBizDocRev(true));  // show loading panel
    const data = yield call(Api.getRecs, 'BizDocRev');
    yield put(actionGen(actionBizDocRev.FETCH_BizDocRev_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingBizDocRev(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchCreateBizDocRev() {
  yield takeEvery(actionBizDocRev.CREATE_BizDocRev_REQUESTED, createBizDocRev);
}

function* createBizDocRev(action) {
  try {
    yield put(actionError.clearStateError);
    const data = yield call(Api.createRec, 'BizDocRev', action.payload);
    yield put(actionGen(actionBizDocRev.CREATE_BizDocRev_SUCCESSFUL, data));
    yield put(actionControl.setShowFormBizDocRev(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchDeleteBizDocRev() {
  yield takeEvery(actionBizDocRev.DELETE_BizDocRev_REQUESTED, deleteBizDocRev);
}

function* deleteBizDocRev(action) {
  try {
    yield call(Api.deleteRec, 'BizDocRev', action.payload);
    yield put(actionGen(actionBizDocRev.DELETE_BizDocRev_SUCCESSFUL, action.payload));
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
export function* watchUpdateBizDocRev() {
  yield takeEvery(actionBizDocRev.UPDATE_BizDocRev_REQUESTED, updateBizDocRev);
}

function* updateBizDocRev(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    yield call(Api.updateRec, 'BizDocRev', rec);
    yield put(actionGen(actionBizDocRev.UPDATE_BizDocRev_SUCCESSFUL, rec));
    yield put(actionControl.setShowFormBizDocRev(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError(error));
  }
}

//==================================================================
