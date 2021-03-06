import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionBizDoc from '../actions/actionBizDoc';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchBizDocs() {
  yield takeEvery(actionBizDoc.FETCH_BizDoc_REQUESTED, fetchBizDocs);
}

function* fetchBizDocs(action) {
  try {
    yield put(actionControl.setShowLoadingBizDoc(true));  // show loading panel
    const data = yield call(Api.getRecs, 'BizDoc');
    yield put(actionGen(actionBizDoc.FETCH_BizDoc_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingBizDoc(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('BizDoc_main', error));
  }
}

//==================================================================
export function* watchCreateBizDoc() {
  yield takeEvery(actionBizDoc.CREATE_BizDoc_REQUESTED, createBizDoc);
}

function* createBizDoc(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'BizDoc', recPure);
    yield put(actionGen(actionBizDoc.CREATE_BizDoc_SUCCESSFUL, data));
    yield put(actionControl.setShowFormBizDoc(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDoc_form', error));
  }
}

//==================================================================
export function* watchDeleteBizDoc() {
  yield takeEvery(actionBizDoc.DELETE_BizDoc_REQUESTED, deleteBizDoc);
}

function* deleteBizDoc(action) {
  try {
    yield call(Api.deleteRec, 'BizDoc', action.payload);
    yield put(actionGen(actionBizDoc.DELETE_BizDoc_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentBizDoc({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('BizDoc_main', error));
  }
}

//==================================================================
export function* watchUpdateBizDoc() {
  yield takeEvery(actionBizDoc.UPDATE_BizDoc_REQUESTED, updateBizDoc);
}

function* updateBizDoc(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'BizDoc', recPure);
    yield put(actionGen(actionBizDoc.UPDATE_BizDoc_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentBizDoc(rec));  // update the current rec
    yield put(actionControl.setShowFormBizDoc(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDoc_form', error));
  }
}


//==================================================================
