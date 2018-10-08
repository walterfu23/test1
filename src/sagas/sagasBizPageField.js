import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionBizPageField from '../actions/actionBizPageField';
import Api from '../apis/Api';
import utils from '../utils/utils';

//==================================================================
export function* watchFetchBizPageFields() {
  yield takeEvery(actionBizPageField.FETCH_BizPageField_REQUESTED, fetchBizPageFields);
}

function* fetchBizPageFields(action) {
  try {
    yield put(actionControl.setShowLoadingBizPageField(true));  // show loading panel
    const data = yield call(Api.getRecs, 'BizPageField');
    yield put(actionGen(actionBizPageField.FETCH_BizPageField_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingBizPageField(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('BizPageField_main', error));
  }
}

//==================================================================
export function* watchCreateBizPageField() {
  yield takeEvery(actionBizPageField.CREATE_BizPageField_REQUESTED, createBizPageField);
}

function* createBizPageField(action) {
  try {
    yield put(actionError.clearStateError);
    // request to create the record. 
    // The next line is needed for Add Similar:
    // the web svc model of BizPageField does not have
    // the "selected" field. It needs to be wiped out, along with Id and BizDocRevPage.
    const recPure = utils.cloneDelProps(action.payload, 'Id', 'BizDocRevPage', 'selected');
    const data = yield call(Api.createRec, 'BizPageField', recPure);
    yield put(actionGen(actionBizPageField.CREATE_BizPageField_SUCCESSFUL, data));
    yield put(actionControl.setShowFormBizPageField(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizPageField_form', error));
  }
}

//==================================================================
export function* watchDeleteBizPageField() {
  yield takeEvery(actionBizPageField.DELETE_BizPageField_REQUESTED, deleteBizPageField);
}

function* deleteBizPageField(action) {
  try {
    // request to update the record
    // the web svc model of BizDocRev does not have
    // the "selected" field. It needs to be wiped out.
    const recPure = utils.cloneDelProps(action.payload, 'BizDocRevPage', 'selected');
    yield call(Api.deleteRec, 'BizPageField', recPure);
    yield put(actionGen(actionBizPageField.DELETE_BizPageField_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentBizPageField({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('BizPageField_main', error));
  }
}

//==================================================================
export function* watchUpdateBizPageField() {
  yield takeEvery(actionBizPageField.UPDATE_BizPageField_REQUESTED, updateBizPageField);
}

function* updateBizPageField(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    // request to update the record
    // the web svc model of BizDocRev does not have
    // the "selected" field. It needs to be wiped out.
    const recPure = utils.cloneDelProps(rec, 'dispLabel', 'BizDocRevPage', 'selected');
    yield call(Api.updateRec, 'BizPageField', recPure);
    yield put(actionGen(actionBizPageField.UPDATE_BizPageField_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentBizPageField(rec));  // update the current rec
    yield put(actionControl.setShowFormBizPageField(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('BizPageField_form', error));
  }
}

//==================================================================
