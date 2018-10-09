import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchBizDocRevPages() {
  yield takeEvery(actionBizDocRevPage.FETCH_BizDocRevPage_REQUESTED, fetchBizDocRevPages);
}

function* fetchBizDocRevPages(action) {
  try {
    yield put(actionControl.setShowLoadingBizDocRevPage(true));  // show loading panel
    const data = yield call(Api.getRecs, 'BizDocRevPage');
    yield put(actionGen(actionBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingBizDocRevPage(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRevPage_main', error));
  }
}

//==================================================================
export function* watchCreateBizDocRevPage() {
  yield takeEvery(actionBizDocRevPage.CREATE_BizDocRevPage_REQUESTED, createBizDocRevPage);
}

function* createBizDocRevPage(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'BizDocRevPage', recPure);
    yield put(actionGen(actionBizDocRevPage.CREATE_BizDocRevPage_SUCCESSFUL, data));
    yield put(actionControl.setShowFormBizDocRevPage(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRevPage_form', error));
  }
}

//==================================================================
export function* watchDeleteBizDocRevPage() {
  yield takeEvery(actionBizDocRevPage.DELETE_BizDocRevPage_REQUESTED, deleteBizDocRevPage);
}

function* deleteBizDocRevPage(action) {
  try {
    yield call(Api.deleteRec, 'BizDocRevPage', action.payload);
    yield put(actionGen(actionBizDocRevPage.DELETE_BizDocRevPage_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentBizDocRevPage({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRevPage_main', error));
  }
}

//==================================================================
export function* watchUpdateBizDocRevPage() {
  yield takeEvery(actionBizDocRevPage.UPDATE_BizDocRevPage_REQUESTED, updateBizDocRevPage);
}

function* updateBizDocRevPage(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'BizDocRevPage', recPure);
    yield put(actionGen(actionBizDocRevPage.UPDATE_BizDocRevPage_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentBizDocRevPage(rec));  // update the current rec
    yield put(actionControl.setShowFormBizDocRevPage(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizDocRevPage_form', error));
  }
}

//==================================================================
