import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionBizDocRev from '../actions/actionBizDocRev';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

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
    yield put(actionError.reportStateError('BizDocRev_main', error));
  }
}

//==================================================================
export function* watchCreateBizDocRev() {
  yield takeEvery(actionBizDocRev.CREATE_BizDocRev_REQUESTED, createBizDocRev);
}

function* createBizDocRev(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'BizDocRev', recPure);
    yield put(actionGen(actionBizDocRev.CREATE_BizDocRev_SUCCESSFUL, data));
    yield put(actionControl.setShowFormBizDocRev(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRev_form', error));
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
    yield put(actionControl.setCurrentBizDocRev({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRev_main', error));
  }
}

//==================================================================
export function* watchUpdateBizDocRev() {
  yield takeEvery(actionBizDocRev.UPDATE_BizDocRev_REQUESTED, updateBizDocRev);
}

function* updateBizDocRev(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'BizDocRev', recPure);
    yield put(actionGen(actionBizDocRev.UPDATE_BizDocRev_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentBizDocRev(rec));  // update the current rec
    yield put(actionControl.setShowFormBizDocRev(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRev_form', error));
  }
}

//==================================================================
